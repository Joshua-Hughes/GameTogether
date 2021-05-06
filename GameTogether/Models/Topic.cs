using System;

namespace GameTogether.Models
{
    public class Topic
    {
        public int id { get; set; }

        public string topicTitle { get; set; }

        public string topicContent { get; set; }

        public string topicCreationDate { get; set; }

        public int topicAuthorId { get; set; }

        public UserProfile topicAuthor { get; set; }

        public string topicImage { get; set; }
    }
}
