using GameTogether.Models;
using System.Collections.Generic;

namespace GameTogether.Repositories
{
    public interface IThreadCommentRepository
    {
        List<ThreadComment> GetCommentsByTopic(int id);
        void Add(ThreadComment comment);
        void Delete(int commentId);
        void Update(ThreadComment comment);
    }
}