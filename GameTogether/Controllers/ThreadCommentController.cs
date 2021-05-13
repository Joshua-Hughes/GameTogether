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

        [HttpPost("add")]
        public IActionResult Post(ThreadComment comment)
        {
            var currentUserProfile = GetCurrentUserProfile();
            comment.authorId = currentUserProfile.id;
            _threadCommentRepository.Add(comment);
            return CreatedAtAction("Get", new { id = comment.id }, comment);
        }

        [HttpDelete("delete/{commentId}")]
        public IActionResult Delete(int commentId)
        {
            _threadCommentRepository.Delete(commentId);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, ThreadComment comment)
        {
            if (id != comment.id)
            {
                return BadRequest();
            }

            _threadCommentRepository.Update(comment);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
