function Decoder(bytes, port) {
  var mode=(bytes[2] & 0x7C)>>2;
  var decode = {};
  decode.Bat_V=(bytes[0]<<8 | bytes[1])/1000; 
  if(mode==1)
  {
    decode.Work_mode="CO2";
    decode.Alarm_status=(bytes[2] & 0x01)? "TRUE":"FALSE"; 
    decode.TVOC_ppb= bytes[3]<<8 | bytes[4]; 
    decode.CO2_ppm= bytes[5]<<8 | bytes[6];
    decode.TempC_SHT=parseFloat(((bytes[7]<<24>>16 | bytes[8])/10).toFixed(2));
    decode.Hum_SHT=parseFloat(((bytes[9]<<8 | bytes[10])/10).toFixed(1));  
  }
  else if(mode==31)
  {
    decode.Work_mode="ALARM";
    decode.SHTEMPMIN= bytes[3]<<24>>24;
    decode.SHTEMPMAX= bytes[4]<<24>>24;   
    decode.SHTHUMMIN= bytes[5];
    decode.SHTHUMMAX= bytes[6]; 
    decode.CO2MIN= bytes[7]<<8 | bytes[8]; 
    decode.CO2MAX= bytes[9]<<8 | bytes[10]; 
  }
  
  if(bytes.length==11)
  {
    return decode;
  }
}