using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GameTogether.Models
{
    public class ThreadComment
    {
        public int id { get; set; }
        public int topicId { get; set; }
        public int authorId { get; set; }
        public UserProfile author { get; set; }
        public string threadComment { get; set; }
        public string commentCreationDate { get; set; }
    }
}
