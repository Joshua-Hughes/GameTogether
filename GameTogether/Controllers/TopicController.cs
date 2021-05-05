using System;
using Microsoft.AspNetCore.Mvc;
using GameTogether.Repositories;
using GameTogether.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace GameTogether.Controllers
{
    [Authorize]
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

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
