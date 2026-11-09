$(document).ready(function(){
    // Core 카드 목록이 화면에 들어오면 한 번 실행
    let coreList = document.querySelector(".core-wrap > ul");

    if(coreList && "IntersectionObserver" in window){
        let coreObserver = new IntersectionObserver(function(entries){
            entries.forEach(function(entry){
                if(entry.isIntersecting){
                    entry.target.classList.add("is-visible");
                    coreObserver.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: "0px 0px -10% 0px",
            threshold: 0
        });

        coreObserver.observe(coreList);
    }

    // 브랜드 이미지 영역이 화면에 들어오면 한 번 실행
    let brandArea = document.querySelector(".brands-content");

    if(brandArea && "IntersectionObserver" in window){
        brandArea.classList.add("reveal-ready");

        let brandObserver = new IntersectionObserver(function(entries){
            entries.forEach(function(entry){
                if(entry.isIntersecting){
                    entry.target.classList.add("is-visible");
                    brandObserver.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: "0px 0px -10% 0px",
            threshold: 0
        });

        brandObserver.observe(brandArea);
    }

    // 1024px 이하 히어로 로고 캐러셀
    let heroIndex = 0;
    let heroItems = $(".hero-brands ul > li");
    let heroList = $(".hero-brands ul");
    let heroSlide = $(".hero-slide");
    let heroDots = $(".hero-dots");
    let heroTimer = null;
    let heroMedia = window.matchMedia("(max-width: 1024px)");

    heroItems.each(function(){
        let name = $(this).children("img").last().attr("alt");
        heroDots.append('<button type="button" aria-label="' + name + ' 보기"></button>');
    });

    let heroButtons = heroDots.children("button");

    function heroMove(){
        if(!heroMedia.matches){
            heroList.css("transform", "");
            return;
        }

        heroItems.removeClass("active");
        heroItems.eq(heroIndex).addClass("active");
        heroButtons.removeClass("active").attr("aria-pressed", "false");
        heroButtons.eq(heroIndex).addClass("active").attr("aria-pressed", "true");

        let item = heroItems.eq(heroIndex);
        let move = heroSlide.width() / 2 - item[0].offsetLeft - item.outerWidth() / 2;
        heroList.css("transform", "translateX(" + move + "px)");
    }

    function heroNext(){
        heroIndex++;
        if(heroIndex >= heroItems.length){ heroIndex = 0; }
        heroMove();
    }

    $(".hero-next").click(heroNext);

    $(".hero-prev").click(function(){
        heroIndex--;
        if(heroIndex < 0){ heroIndex = heroItems.length - 1; }
        heroMove();
    });

    heroButtons.click(function(){
        heroIndex = $(this).index();
        heroMove();
    });

    heroItems.click(function(){
        if(heroMedia.matches){
            heroIndex = $(this).index();
            heroMove();
        }
    });

// 1024px 셋인터벌
    function heroAuto(){
        clearInterval(heroTimer);
        heroTimer = null;

        if(heroMedia.matches){
            heroTimer = setInterval(heroNext, 2000);
        }
    }

    heroMedia.addEventListener("change", heroAuto);

    $(window).resize(function(){
        heroMove();
    });
    heroMove();
    heroAuto();

// 햄버거 메뉴 열기
    $(".h-icon > a:first-child").click(function(e){
        e.preventDefault();
        $(".menu-bar").stop().fadeIn(200);
        $("body").css("overflow", "hidden");
    });

// X 버튼으로 닫기
    $(".menu-bar .bar-icon button").click(function(){
        $(".menu-bar").stop().fadeOut(200);
        $("body").css("overflow", "");
    });

// 메뉴 제목을 누르면 하위 메뉴 펼치기 / 접기
    $(".menu-bar > ul > li > a").click(function(e){
        e.preventDefault();
        $(".menu-bar .sub-menu-wrap").not($(this).next()).stop().slideUp(200);
        $(this).next(".sub-menu-wrap").stop().slideToggle(200);
    });
// 헤더
    $(".gnb > ul > li").mouseenter(function(){
        $(".gnb .sub-menu-wrap").stop().hide();
        $(this).children(".sub-menu-wrap").css("display", "flex").hide().slideDown(200);
        $(".header-bg").stop().slideDown(200);
    });

    $("header").mouseleave(function(){
        $(".gnb .sub-menu-wrap").stop().slideUp(200);
        $(".header-bg").stop().slideUp(200);
    });
// 브랜드 탭메뉴
    let brandTabs = $(".brands-tab > li");
    let brandContents = $(".brands-content > ul");

    brandTabs.click(function(){
        let i = $(this).index();

        brandTabs.removeClass("active");
        $(this).addClass("active");

        brandContents.removeClass("active");
        brandContents.eq(i).addClass("active");
    });
    // Food ON 탭메뉴
    let foodTabs = $(".tab-menu > li");
    let foodContents = $(".tab-content-wrap > li");

    foodTabs.click(function(){
        let i = $(this).index();

        foodTabs.removeClass("active");
        $(this).addClass("active");

        foodContents.removeClass("active");
        foodContents.eq(i).addClass("active");
    });

    setInterval(function(){
        let i = foodTabs.filter(".active").index();
        let total = foodTabs.length;

        i++;
        if(i >= total){ i = 0; }

        foodTabs.eq(i).trigger("click");
    }, 2000);

// 모바일 Food ON 이전 / 다음
    $(".food-arrow > div").click(function(){
        let i = foodContents.filter(".active").index();
        let total = foodTabs.length;

        if($(this).index() == 0){
            i--;
        }else{
            i++;
        }

        if(i < 0){ i = total - 1; }
        if(i >= total){i = 0; }

        foodTabs.eq(i).trigger("click");
    });

});
