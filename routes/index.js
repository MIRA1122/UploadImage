var express = require('express');
var router = express.Router();
var multer = require('multer');
var storage = multer.diskStorage({
  //ファイルの保存先を指定(ここでは保存先は./public/imagesらしい) Expressだとstaticとかいうのでpublic以下におかんとだめらしい
  destination: function(req, file, cb){
    //Express4の仕様で画像,cssとかstaticなファイルを保存するときはpublic/以下のフォルダに置くらしい
    //詳しくは express.static public でググろう！
    cb(null, './public/images/')
  },
  //ファイル名を指定
  filename: function(req, file, cb){
    //とりあえずファイル名をimage.jpgに固定
    //出力名を file.originalname　にすると元の画像の名前で保存されるが、image.ejsで表示するときに動的な処理が必要になってめんどくさそうだったので、いったん固定で
    cb(null,'image.jpg')
  }
})

//なんぞ？
var upload = multer({storage: storage})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '画像あっぷろーだー' });
});

//ルート (/) に対する POST リクエスト
//name に「file」を指定したファイルのアップロード (index.ejs 画像選択のところでnameをfileに指定している)
router.post('/',upload.single('file'),function(req,res){
  //res.json({'result':'success!'});
  res.render('image'); //image.ejsを返して(response)、HTML形式で画像表示させる
});

module.exports = router;
