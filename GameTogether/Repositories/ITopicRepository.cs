using GameTogether.Models;
using System.Collections.Generic;

namespace GameTogether.Repositories
{
    public interface ITopicRepository
    {
        List<Topic> GetAll();
        List<Topic> SearchTopics(string search);
        Topic GetTopicDetails(int id);
    }
}
