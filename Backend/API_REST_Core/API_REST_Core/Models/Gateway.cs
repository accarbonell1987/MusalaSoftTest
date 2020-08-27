using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_REST_Core.Models
{
    public class Gateway
    {
        #region Properties
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int _id { get; set; }
        public string serialnumber { get; set; }
        public string name { get; set; }
        public string ipv4address { get; set; }
        #endregion

        #region Relations
        public ICollection<Device> devices { get; set; } = new List<Device>();
        #endregion
    }
}