using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using Microsoft.Data.SqlClient;
using GameTogether.Models;
using GameTogether.Utils;

namespace GameTogether.Repositories
{
    public class ThreadCommentRepository : BaseRepository, IThreadCommentRepository
    {
        public ThreadCommentRepository(IConfiguration configuration) : base(configuration) { }

        public List<ThreadComment> GetCommentsByTopic(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT tc.id AS commentId, tc.topicId, a.id AS authorId, a.displayName, tc.threadComment, tc.commentCreationDate
                                        FROM ThreadComment tc
                                        LEFT JOIN UserProfile a ON tc.authorId = a.id
                                        WHERE tc.topicId = @id
                                        ORDER BY commentCreationDate DESC;";

                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();

                    var threadComments = new List<ThreadComment>();
                    while (reader.Read())
                    {
                        threadComments.Add(new ThreadComment()
                        {
                            id = DbUtils.GetInt(reader, "commentId"),
                            topicId = DbUtils.GetInt(reader, "topicId"),
                            authorId = DbUtils.GetInt(reader, "authorId"),
                            author = new UserProfile()
                            {
                                id = DbUtils.GetInt(reader, "authorId"),
                                displayName = DbUtils.GetString(reader, "displayName")
                            },
                            threadComment = DbUtils.GetString(reader, "threadComment"),
                            commentCreationDate = DbUtils.GetDateTime(reader, "commentCreationDate").ToString("MM/dd/yyyy")
                        });
                    }
                    reader.Close();

                    return threadComments;
                }
            }
        }
    }
}
