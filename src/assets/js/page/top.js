let scrollY = 0;
let winH = 0;

export default class Top {
  constructor () {

    //IE対応のためhtmlにieクラスを付与
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.indexOf("msie") !== -1 || ua.indexOf("trident") !== -1) {
      $('html').addClass('ie');
      isIE = true;
    }
    scrollY = $(window).scrollTop();
    winH = $(window).height();
    $load = $('.load ');
    $loader = $('.load__loading ');
    $container = $('.container');

    this.renderImg();
    window.addEventListener("scroll", this.onScroll.bind(this));
    this.onClickNav();
  }

  /*-------------------------------
  ** 画像読み込み完了までローディングを表示
  **-------------------------------*/
  renderImg() {
    const _this = this;
    let imgArr = document.querySelectorAll('.main__img');
    let loadedNum = 0;
    let calc = Math.floor(100 / imgArr.length);

    for (let i = 0; i < imgArr.length; i++) {
      imgArr[i].src = imgArr[i].getAttribute("data-src");
      _this.onLoadImg(imgArr[i]).then(res => {
        res.style.opacity = 1;
        loadedNum++;
        let width = Math.floor(loadedNum * calc);
        if (width > 90) {
          width = 100;
        }
        $loader.css('width', width + '%');
        if (loadedNum >= imgArr.length) {
          console.log('読み込み完了');
          $container.addClass('loaded');
          $load.addClass('loaded');
          setTimeout(() => {
            $load.hide();
          }, 1000);
        }
      }).catch(e => {
        console.log('load error', e);
      })
    }
  }

  /*-------------------------------
  ** 画像読み込み
  **-------------------------------*/
  onLoadImg(img) {
    return new Promise((resolve, reject) => {
      img.addEventListener('load', (e)=> {
        resolve(img);
      });
      img.addEventListener('error', (e) => {
        reject(e);
      });
    });
  }

  /*-------------------------------
  ** ハンバーガーナビの制御
  **-------------------------------*/
  onClickNav() {
  }

  onScroll() {
  }
}
