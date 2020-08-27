using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using API_REST_Core.Models;
using API_REST_Core.Utils;
using API_REST_Core_xUnit.Interfaces;

namespace API_REST_Core_xUnit.Models
{
    public class TestGateway : IGateway
    {
        public void GatewayInterfaceMethod(Gateway gateway) {
            bool isValid = IPAddress.TryParse(gateway.ipv4address, out IPAddress ip);
            if (!isValid) throw new ArgumentException(String.Format("The Ipv4 Address is not correct: {0}", gateway.ipv4address));
        }
    }
}
