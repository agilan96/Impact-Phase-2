using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Serialization.Formatters.Binary;
using System.Text;
using System.Web.Http;
using WebCrud.Models;

namespace WebCrud.Controllers
{
   
    public class MasterDataController : ApiController
    {
        static string result;
        MasterDataEntities objEntity = new MasterDataEntities();
        static string value = null;
        MasterValue[] temp = new MasterValue[50];
        
        

        [Authorize]
        [HttpGet]
        [Route("Api/Employee/AllValues")]
        public IQueryable GetValues()
        {
            try
            {
                var k = from MasterValue e in objEntity.MasterValues
                        where e.MasterName == value
                        select e;
                return k;
            }
            catch (Exception)
            {
                throw;
            }
        }
        [Authorize]
        [HttpGet]
        [Route("Api/Employee/GetEmployeeDetailsById/{employeeId}")]
        public IHttpActionResult GetValueById(int Id)
        {
            MasterValue objEmp = new MasterValue();

            try
            {
                objEmp = objEntity.MasterValues.Find(Id);
                if (objEmp == null)
                {
                    return NotFound();
                }

            }
            catch (Exception)
            {
                throw;
            }

            return Ok(objEmp);
        }
        
        [HttpPost]
        [Route("Api/Employee/InsertValues")]
        public IHttpActionResult PostValue(MasterValue data)
        {


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                MasterList obj = new MasterList();
                result = JsonConvert.SerializeObject(data);
                value = data.MasterName;        
                data.Deleted = 0;
                objEntity.MasterValues.Add(data);
                objEntity.SaveChanges();

            }
            catch (Exception)
            {

                throw;
            }



            return Ok(data);
        }

   

        [Authorize]
        [HttpDelete]
        [Route("Api/Employee/DeleteValues")]
        public IHttpActionResult DeleteValue(int id)
        {
         
            MasterValue employee = objEntity.MasterValues.Find(id);
            if (employee == null)
            {
                return NotFound();
            }

            objEntity.MasterValues.Remove(employee);
            objEntity.SaveChanges();

            return Ok(employee);
        }
        [Authorize]
        [HttpGet]
        [Route("Api/Employee/SaveValues")]
        public IHttpActionResult SaveValue()
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                MasterList obj = new MasterList();
                string name = value;
                obj.MasterName = name;
                value = null;
                obj.JsonObject = null;
                objEntity.MasterLists.Add(obj);
                objEntity.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }



            return Ok(value);
        }
        [Authorize]
        [HttpGet]
        [Route("Api/Employee/All")]
        public IHttpActionResult GetLists()
        {
            try
            {
                var k = from MasterList e in objEntity.MasterLists
                        where e.MasterName != null
                        select e;
                return Ok(k);
            }
            catch (Exception)
            {
                throw;
            }
        }
        [Authorize]
        [HttpGet]
        [Route("Api/Employee/Selected/{master}")]
        public IQueryable GetMaster(string master)
        {
            try
            {
                var k = from MasterValue e in objEntity.MasterValues
                        where e.MasterName == master
                        select e;
                return k;
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpGet]
        [Route("Api/Employee/Demo/{master}")]
        public IQueryable GetMasterDemo(string master)
        {
            try
            {
                var k = from MasterValue e in objEntity.MasterValues
                        where ((e.MasterName == master)&(e.Deleted==0))
                        select e;
                return k;
            }
            catch (Exception)
            {
                throw;
            }
        }
        [Authorize]
        [HttpPut]
        [Route("Api/Employee/enable")]
        public IHttpActionResult enable(MasterValue employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                MasterValue objEmp = new MasterValue();
                objEmp = objEntity.MasterValues.Find(employee.Id);
                if (objEmp != null)
                {
                    objEmp.Deleted = 0;                  

                }
                objEntity.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
            return Ok();
        }
        [Authorize]
        [HttpPut]
        [Route("Api/Employee/disable")]
        public IHttpActionResult disable(MasterValue employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                MasterValue objEmp = new MasterValue();
                objEmp = objEntity.MasterValues.Find(employee.Id);
                if (objEmp != null)
                {
                    objEmp.Deleted = 1;

                }
                objEntity.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
            return Ok();
        }

    }
}
