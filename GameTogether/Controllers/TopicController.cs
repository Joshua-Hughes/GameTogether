using System;
using Microsoft.AspNetCore.Mvc;
using GameTogether.Repositories;
using GameTogether.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace GameTogether.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TopicController : ControllerBase
    {
        private readonly ITopicRepository _topicRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public TopicController(ITopicRepository topicRepository, IUserProfileRepository userProfileRepository)
        {
            _topicRepository = topicRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_topicRepository.GetAll());
        }

        [HttpGet("{search}/SearchTopics")]
        public IActionResult Search(string search)
        {
            return Ok(_topicRepository.SearchTopics(search));
        }

        [HttpGet("{id}/TopicDetails")]
        public IActionResult Details(int id)
        {
            return Ok(_topicRepository.GetTopicDetails(id));
        }

        [HttpPost("add")]
        public IActionResult Post(Topic topic)
        {
            var currentUserProfile = GetCurrentUserProfile();
            topic.topicAuthorId = currentUserProfile.id;
            _topicRepository.Add(topic);
            return CreatedAtAction("Get", new { id = topic.id }, topic);
        }

        [HttpDelete("delete/{topicId}")]
        public IActionResult Delete(int topicId)
        {
            _topicRepository.Delete(topicId);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Topic topic)
        {
            if (id != topic.id)
            {
                return BadRequest();
            }

            _topicRepository.Update(topic);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

    }
}
