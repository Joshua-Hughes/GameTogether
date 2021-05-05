using GameTogether.Models;
using System.Collections.Generic;

namespace GameTogether.Repositories
{
    public interface IUserProfileRepository
    {
        List<UserProfile> GetAllUserProfiles();

        UserProfile GetByFirebaseUserId(string firebaseUserId);

        UserProfile GetUserProfileById(int id);

        void Add(UserProfile userProfile);
    }
}