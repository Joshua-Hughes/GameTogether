using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using Microsoft.Data.SqlClient;
using GameTogether.Models;
using GameTogether.Utils;

namespace GameTogether.Repositories
{
    public class TopicRepository : BaseRepository, ITopicRepository
    {
        public TopicRepository(IConfiguration configuration) : base(configuration) { }

        public List<Topic> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT t.id AS topicId, t.topicTitle, t.topicContent, t.topicCreationDate, t.topicImage, a.id AS authorId, a.displayName
                                        FROM Topic t
                                        LEFT JOIN UserProfile a ON a.id = t.topicAuthorId
                                        ORDER BY t.topicCreationDate DESC;";

                    var reader = cmd.ExecuteReader();

                    var topics = new List<Topic>();
                    while (reader.Read())
                    {
                        topics.Add(new Topic()
                        {
                            id = DbUtils.GetInt(reader, "topicId"),
                            topicTitle = DbUtils.GetString(reader, "topicTitle"),
                            topicContent = DbUtils.GetNullableString(reader, "topicContent"),
                            topicCreationDate = DbUtils.GetDateTime(reader, "topicCreationDate").ToString("MM/dd/yyyy"),
                            topicAuthorId = DbUtils.GetInt(reader, "authorId"),
                            topicImage = DbUtils.GetNullableString(reader, "topicImage"),
                            topicAuthor = new UserProfile()
                            {
                                id = DbUtils.GetInt(reader, "authorId"),
                                displayName = DbUtils.GetString(reader, "displayName")
                            }
                        });
                    }

                    reader.Close();

                    return topics;
                }
            }
        }

        public List<Topic> SearchTopics(string search)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT t.id AS topicId, t.topicTitle, t.topicContent, t.topicCreationDate, t.topicImage, a.id AS authorId, a.displayName
                                        FROM Topic t
                                        LEFT JOIN UserProfile a ON a.id = t.topicAuthorId
                                        WHERE t.topicTitle LIKE '%' + @Search + '%' 
                                        ORDER BY t.topicCreationDate DESC;";

                    DbUtils.AddParameter(cmd, "@Search", search);

                    var reader = cmd.ExecuteReader();

                    var topics = new List<Topic>();
                    while (reader.Read())
                    {
                        topics.Add(new Topic()
                        {
                            id = DbUtils.GetInt(reader, "topicId"),
                            topicTitle = DbUtils.GetString(reader, "topicTitle"),
                            topicContent = DbUtils.GetNullableString(reader, "topicContent"),
                            topicCreationDate = DbUtils.GetDateTime(reader, "topicCreationDate").ToString("MM/dd/yyyy"),
                            topicAuthorId = DbUtils.GetInt(reader, "authorId"),
                            topicImage = DbUtils.GetNullableString(reader, "topicImage"),
                            topicAuthor = new UserProfile()
                            {
                                id = DbUtils.GetInt(reader, "authorId"),
                                displayName = DbUtils.GetString(reader, "displayName")
                            }
                        });
                    }

                    reader.Close();

                    return topics;
                }
            }
        }

        public Topic GetTopicDetails(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT t.id AS topicId, t.topicTitle, t.topicContent, t.topicCreationDate, t.topicImage, a.id AS authorId, a.displayName
                                        FROM Topic t
                                        LEFT JOIN UserProfile a ON a.id = t.topicAuthorId
                                        WHERE t.id = @id
                                        ORDER BY t.topicCreationDate DESC;";

                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        Topic topic = new Topic()
                        {
                            id = DbUtils.GetInt(reader, "topicId"),
                            topicTitle = DbUtils.GetString(reader, "topicTitle"),
                            topicContent = DbUtils.GetNullableString(reader, "topicContent"),
                            topicCreationDate = DbUtils.GetDateTime(reader, "topicCreationDate").ToString("MM/dd/yyyy"),
                            topicAuthorId = DbUtils.GetInt(reader, "authorId"),
                            topicImage = DbUtils.GetNullableString(reader, "topicImage"),
                            topicAuthor = new UserProfile()
                            {
                                id = DbUtils.GetInt(reader, "authorId"),
                                displayName = DbUtils.GetString(reader, "displayName")
                            }
                        };

                        reader.Close();

                        return topic;
                    }

                    reader.Close();

                    return null;
                }
            }
        }

        public void Add(Topic topic)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Topic (topicTitle, topicContent, topicCreationDate, topicAuthorId, topicImage)
                                        OUTPUT INSERTED.ID
                                        VALUES (@topicTitle, @topicContent, @topicCreationDate, @topicAuthorId, @topicImage);";

                    DbUtils.AddParameter(cmd, "@topicTitle", topic.topicTitle);
                    DbUtils.AddParameter(cmd, "@topicContent", topic.topicContent);
                    DbUtils.AddParameter(cmd, "@topicCreationDate", topic.topicCreationDate);
                    DbUtils.AddParameter(cmd, "@topicAuthorId", topic.topicAuthorId);
                    DbUtils.AddParameter(cmd, "@topicImage", topic.topicImage);

                    topic.id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Delete(int topicId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM ThreadComment WHERE topicId = @id;
                                        DELETE FROM Topic WHERE id = @id;";

                    DbUtils.AddParameter(cmd, "@id", topicId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Update(Topic topic)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Topic
                            SET topicTitle = @topicTitle,
                            topicContent = @topicContent,
                            topicImage = @topicImage
                        WHERE id = @id;";

                    DbUtils.AddParameter(cmd, "@topicTitle", topic.topicTitle);
                    DbUtils.AddParameter(cmd, "@topicContent", topic.topicContent);
                    DbUtils.AddParameter(cmd, "@topicImage", topic.topicImage);
                    DbUtils.AddParameter(cmd, "@id", topic.id);
                        
                        cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
