using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_REST_Core.Models
{
    public class Device
    {
        #region Properties
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int _id { get; set; }

        public int number { get; set; }
        public string vendor { get; set; }
        public DateTime datecreated { get; set; }
        public bool status { get; set; }
        #endregion

        #region Relations
        [ForeignKey("_idGateway")]
        public Gateway gateway { get; set; }
        public int _idGateway { get; set; }
        #endregion
    }
}
