using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace API_REST_Core.Utils
{
    public static class Helper {
        #region Properties
        private static readonly string code = "ThisIsForMusalaSoftFromHumbleCuban2020";
        #endregion

        #region Methods
        /// <summary>
        /// Generate Has From code
        /// </summary>
        /// <returns>String</returns>
        public static string GenerateHashSerial() {
            using (SHA256 sha256Hash = SHA256.Create()) {
                //get unix time stamp
                var unixTimeStamp = DateTimeOffset.Now.ToUnixTimeSeconds();
                //add unix to code and create a new unique code
                var mCode = code + unixTimeStamp.ToString();
                //return new Hash
                return GetHash(sha256Hash, mCode);
            }
        }

        /// <summary>
        /// If my ipdireccion is IPv4 valid...
        /// </summary>
        /// <param name="ipdireccion">ipdireccion</param>
        /// <returns>bool</returns>
        public static bool IsValidIPv4(string ipdireccion) {
            if (IPAddress.TryParse(ipdireccion, out IPAddress address)) {
                switch (address.AddressFamily) {
                    case System.Net.Sockets.AddressFamily.InterNetwork:
                        return true;
                    default:
                        return false;
                }
            }
            return false;
        }

        //Taken from https://docs.microsoft.com/en-us/dotnet/api/system.security.cryptography.hashalgorithm.computehash?view=netcore-3.1
        private static string GetHash(HashAlgorithm hashAlgorithm, string input) {

            // Convert the input string to a byte array and compute the hash.
            byte[] data = hashAlgorithm.ComputeHash(Encoding.UTF8.GetBytes(input));

            // Create a new Stringbuilder to collect the bytes
            // and create a string.
            var sBuilder = new StringBuilder();

            // Loop through each byte of the hashed data
            // and format each one as a hexadecimal string.
            for (int i = 0; i < data.Length; i++) {
                sBuilder.Append(data[i].ToString("x2"));
            }

            // Return the hexadecimal string.
            return sBuilder.ToString();
        }
        #endregion
    }

}
