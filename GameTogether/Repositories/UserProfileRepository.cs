using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using GameTogether.Models;
using GameTogether.Utils;

namespace GameTogether.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public List<UserProfile> GetAllUserProfiles()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT id, displayName, email, firebaseUserId
                         FROM UserProfile";

                    UserProfile userProfile = null;
                    var reader = cmd.ExecuteReader();

                    var userProfiles = new List<UserProfile>();
                    while (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            id = reader.GetInt32(reader.GetOrdinal("id")),
                            firebaseUserId = reader.GetString(reader.GetOrdinal("firebaseUserId")),
                            displayName = reader.GetString(reader.GetOrdinal("displayName")),
                            email = reader.GetString(reader.GetOrdinal("email")),
                        };

                        userProfiles.Add(userProfile);
                    }
                    reader.Close();
                    return userProfiles;
                }
            }
        }


        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT id, firebaseUserId, displayName, email
                          FROM UserProfile
                         WHERE FirebaseUserId = @FirebaseuserId";

                    DbUtils.AddParameter(cmd, "@firebaseUserId", firebaseUserId);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            id = DbUtils.GetInt(reader, "id"),
                            firebaseUserId = DbUtils.GetString(reader, "firebaseUserId"),
                            displayName = DbUtils.GetString(reader, "displayName"),
                            email = DbUtils.GetString(reader, "email"),
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }


        public UserProfile GetUserProfileById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT id, firebaseUserId, displayName, email
                          FROM UserProfile
                         WHERE id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            id = DbUtils.GetInt(reader, "id"),
                            firebaseUserId = DbUtils.GetString(reader, "firebaseUserId"),
                            displayName = DbUtils.GetString(reader, "displayName"),
                            email = DbUtils.GetString(reader, "email"),
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfile (firebaseUserId, displayName, email)
                                        OUTPUT INSERTED.ID
                                        VALUES (@firebaseUserId, @displayName, @email)";
                    DbUtils.AddParameter(cmd, "@firebaseUserId", userProfile.firebaseUserId);
                    DbUtils.AddParameter(cmd, "@displayName", userProfile.displayName);
                    DbUtils.AddParameter(cmd, "@email", userProfile.email);

                    userProfile.id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}