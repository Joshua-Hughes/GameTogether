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
    public class ThreadCommentController : ControllerBase
    {
        private readonly IThreadCommentRepository _threadCommentRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public ThreadCommentController(IThreadCommentRepository threadCommentRepository, IUserProfileRepository userProfileRepository)
        {
            _threadCommentRepository = threadCommentRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet("/thread/{id}")]
        public IActionResult GetCommentsByTopic(int id)
        {
            return Ok(_threadCommentRepository.GetCommentsByTopic(id));
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
