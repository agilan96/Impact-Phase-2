using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebCrud.Models;

namespace WebCrud.Controllers
{
    public class DataTransferController : ApiController
    {
        MasterDataEntities objEntity = new MasterDataEntities();
        dynamic k;

        [HttpGet]
        [Route("Api/Request/{role}/{master}")]
        public IQueryable GetMasterData(string role, string master)
        {
            try
            {
                if (role.ToUpper() == "HR")
                {
                     k = from MasterValue e in objEntity.MasterValues
                            where (((e.MasterName).ToUpper() == master.ToUpper())&(e.Deleted==0))
                            select e.Value;
                }
                return (k);
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}
