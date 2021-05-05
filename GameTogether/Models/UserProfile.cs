using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;

namespace GameTogether.Models
{
    public class UserProfile
    {
        public int id { get; set; }

        [StringLength(28, MinimumLength = 28)]
        public string firebaseUserId { get; set; }

        [Required]
        [MaxLength(50)]
        public string displayName { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [MaxLength(255)]
        public string email { get; set; }
    }
}