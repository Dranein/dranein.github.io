import NodeRSA from 'node-rsa';

var ras = {
	encryptStr(password,pwdkey) {
	  let clientKey = new NodeRSA({b: 512});
	  var publicKey= pwdkey;  //从服务端接收到的公钥，缓存到本地
	  clientKey.importKey(publicKey,'pkcs8-public');
	  clientKey.setOptions({encryptionScheme: 'pkcs1'})
	  let encrypted = clientKey.encrypt(password, 'base64');
	  return  encrypted;
	}
}

export default ras;