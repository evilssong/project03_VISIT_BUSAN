window.addEventListener("DOMContentLoaded", function(){
	
	// 모바일시 스크롤바 활성화
	let body=document.getElementsByTagName("body")[0];
	if(isMobile == false){
		body.classList.add("fixed");
	}


	// 네비게이션 후버
	let gnb=document.getElementById("gnb");
	let gnbLI=gnb.firstElementChild.children;
	let header_top=this.document.querySelector("#header .header_top");
	let winW;

	winW=window.innerWidth;
	
	gnb.addEventListener("mouseenter", function(){
		if(winW > 830){
			header_top.classList.add("active");
		}
	});
	gnb.addEventListener("mouseleave", function(){
		if(winW > 830){
			header_top.classList.remove("active");
		}
	});

	

	// max-830px tab 메뉴
	let wheelAble=true;
	let tab=document.querySelector(".util ul li:last-child .tab");
	let search=document.querySelector(".util li:first-child");
	let login=document.querySelector(".util li:nth-child(2)")
	let dim=document.getElementById("dim");
	tab.addEventListener("click", function(e){
		e.preventDefault();

		if(winW < 830){
			if(tab.classList.contains("active") == false){
				wheelAble=false;
				header_top.classList.add("active");
				tab.classList.add("active");
				login.style.display="none";
				gsap.fromTo(search, {display: "block",x:30, rotateY:180, opacity:0}, {opacity: 1,x:0, rotateY: 0, duration: 1});
				gnb.classList.add("active");
				dim.classList.add("active");
			}
			else{
				wheelAble=true;
				header_top.classList.remove("active");
				tab.classList.remove("active");
				login.classList.remove("active");
				search.style.display="none";
				gsap.fromTo(login, {display: "block",rotateY:180, opacity:0}, {opacity: 1, rotateY: 0, duration: 0.7});
				gnb.classList.remove("active");
				dim.classList.remove("active");
			}
		}
	});
	for(let i=0; i < gnbLI.length; i++){
		gnbLI[i].index=i;

		gnbLI[i].firstElementChild.addEventListener("click", (e) => {
			e.preventDefault();
			if(winW < 830){
				if(e.currentTarget.parentElement.classList.contains("active") == false){
					for(let j=0; j<gnbLI.length; j++){
						if(j == e.currentTarget.parentElement.index){
							gnbLI[j].classList.add("active");
							let sub=gnbLI[j].lastElementChild;
							gsap.to(sub, {height: "auto", duration: 0.5});
						}
						else{
							gnbLI[j].classList.remove("active")
							let sub=gnbLI[j].lastElementChild;
							gsap.to(sub, {height: 0, duration: 0.5});
						}
					}
				}
				else{
					e.currentTarget.parentElement.classList.remove("active");

					let sub=e.currentTarget.nextElementSibling;
					gsap.to(sub, {height: 0, duration: 0.5});
				}
			}
		});
	}


	// 메인 슬라이더
	let slider_video1=document.getElementById("slider_video1");
	let slider_video2=document.getElementById("slider_video2");
	let activeNum=0;
	let videoN=0;
	let videoList1=["slidervdeo1_1.mp4", "slidervdeo1_2.mp4"]
	let videoList2=["slidervdeo2_1.mp4", "slidervdeo2_2.mp4"]
	let posterList1=["post_vdeo1_1.jpg", "post_vdeo1_2.jpg"]
	let posterList2=["post_vdeo2_1.jpg", "post_vdeo2_2.jpg"]
	let videoTotal1=videoList1.length;
	let videoTotal2=videoList2.length;

	slider_video1.addEventListener("loadeddata", function(){
		slider_video1.muted=true;
		slider_video2.muted=true;
		slider_video1.play();
	});

	let mainSwiper = new Swiper(".main_slider .mainSwiper", {
		speed: 1200,
		autoplay: {
			delay: 13000,
			disableOnInteraction: true,
		},
		pagination: {
          el: ".main_slider .swiper-pagination",
		  clickable: true,
    	},
		on: {
			activeIndexChange: function(){
				activeNum=this.activeIndex;

				if(activeNum == 0){
					slider_video1.play();
					slider_video2.setAttribute("src", "video/slidervdeo2_1.mp4");
					slider_video2.setAttribute("poster", "images/post_vdeo2_1.jpg");
					slider_video2.currentTime=0;
					slider_video2.pause();
				}
				else if(activeNum == 1){
					slider_video2.play();
					slider_video1.setAttribute("src", "video/slidervdeo1_1.mp4");
					slider_video1.setAttribute("poster", "images/post_vdeo1_1.jpg");
					slider_video1.currentTime=0;
					slider_video1.pause();
				}
			}
		}
	});

	slider_video1.addEventListener("ended", function(){
		if(videoN < videoTotal1-1){
			videoN+=1;
		}
		else{
			videoN=0;
		}

		slider_video1.setAttribute("src", "video/"+videoList1[videoN]);
		slider_video1.setAttribute("poster", "images/"+posterList1[videoN]);
		slider_video1.play();

		gsap.fromTo(slider_video1, {opacity: 0, delay: 3}, {opacity: 1, duration:1});

	});
	slider_video2.addEventListener("ended", function(){
		if(videoN < videoTotal2-1){
			videoN+=1;
		}
		else{
			videoN=0;
		}

		slider_video2.setAttribute("src", "video/"+videoList2[videoN]);
		slider_video2.setAttribute("poster", "images/"+posterList2[videoN]);
		slider_video2.play();
		gsap.fromTo(slider_video2, {opacity: 0, delay: 3}, {opacity: 1, duration:1});
	});

	// 메인슬라이드 좌측 하단 서브 슬라이드
	let bar=document.getElementById("bar");
	let pause_play=document.getElementById("pause_play");
	let subswiper = new Swiper(".sub_slider .subswiper", {
		direction: "vertical",
		speed: 1500,
		loop: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		on: {
			slideChange: function(){
				if(pause_play.classList.contains("pause") == true){
					gsap.fromTo(bar, {width: 0}, {width: 80, duration: 6.4});
				}
			},
		},
	});
	pause_play.addEventListener("click", function(e){
		e.preventDefault();
		gsap.fromTo(bar, {width: 0}, {width: 0, duration: 0});
		if(e.currentTarget.classList.contains("play") == true){
			e.currentTarget.classList.remove("play")
			e.currentTarget.classList.add("pause")
			e.currentTarget.innerText="pause";
			subswiper.autoplay.start();
		}
		else{
			e.currentTarget.classList.remove("pause")
			e.currentTarget.classList.add("play")
			e.currentTarget.innerText="play";
			subswiper.autoplay.stop();
		}
	});

	// 섹션1 슬라이더
	let swap_bg=document.getElementsByClassName("swap_bg");
	let section1=document.getElementById("section1");
	let s1swiper_slider=document.querySelectorAll(".section1Swiper .swiper-wrapper .swiper-slide");
	let n1;
	let section1swiper = new Swiper("#section1 .section1Swiper", {
		slidesPerView:4,
		spaceBetween:0,
		autoplay: {
					delay: 4000,
					disableOnInteraction: false,
				},
		breakpoints: {
			1400: {
				slidesPerView: 4,
			},
			1000: {
				slidesPerView: 3,
			},
			667: {
				slidesPerView: 2,
			},
			0: {
				slidesPerView: 1,
			}
		},
		on: {
			slideChange: function(){
				n1=this.realIndex;

				if(!isMobile) return;

				for(let j=0; j < s1swiper_slider.length; j++){
					if(n1 == j){
						swap_bg[j].classList.add("active");
					}
					else{
						swap_bg[j].classList.remove("active");
					}
				}	
			}
		}
	});
	
	
	for(let i=0; i < s1swiper_slider.length; i++){
		s1swiper_slider[i].index=i;
		s1swiper_slider[i].addEventListener("mouseenter", function(e){

			n=e.currentTarget.index;
			
			for(let j=0; j < s1swiper_slider.length; j++){
				if(n == j){
					e.currentTarget.firstElementChild.classList.add("active");
					swap_bg[j].classList.add("active");
				}
				else{
					s1swiper_slider[j].firstElementChild.classList.remove("active");
					swap_bg[j].classList.remove("active");
				}
			}
		});
		section1.addEventListener("mouseleave", function(e){
			
			for(let j=0; j < s1swiper_slider.length; j++){
				s1swiper_slider[j].firstElementChild.classList.remove("active");
				swap_bg[j].classList.remove("active");
			}
		});
	}
	if(isMobile){
		for(let j=0; j < s1swiper_slider.length; j++){
				s1swiper_slider[j].firstElementChild.classList.add("active");
			}
	}

	// 섹션 3 슬라이더
	let s3swiper = new Swiper("#section3 .s3Swiper", {
		slidesPerView: 3,
		spaceBetween:30,
		autoplay: {
					delay: 4000,
					disableOnInteraction: false,
				},
		breakpoints: {
			667: {
				slidesPerView: 3,
			},
			500: {
				slidesPerView: 2,
			},
			0: {
				slidesPerView: 1,
			},
		},
	});


	// 마우스 휠 페이지 이동
	
	let pageN=0;
	let h;
	let pos=0;
	let timer=0;
	let total=4;
	let moving=false;
	let html=document.querySelector("html");
	let header=document.getElementById("header");

	window.addEventListener("resize", init);

	function init(){

		if(isMobile) return;

		timer=setTimeout(function(){
			h=window.innerHeight;
			winW=window.innerWidth;
			pos=pageN*h;
			gsap.to(window, {scrollTo: pos, duration: 0.5});
			if(winW > 830){
				search.removeAttribute("style");
				login.removeAttribute("style");
				header_top.classList.remove("active");
				tab.classList.remove("active");
				gnb.removeAttribute("class");
				dim.classList.remove("active");

				for(let i=0; i < gnbLI.length; i++){
					gnbLI[i].removeAttribute("class");
					gnbLI[i].lastElementChild.removeAttribute("style");
				}
			}
			if(pageN == 0){
				fpage[0].classList.add("active");
			}
		}, 100);
	}
	init();

	let fpage=document.querySelectorAll(".wrapper .fpage");
	document.body.addEventListener("mousewheel", function(e){
		if(moving || !wheelAble || isMobile) return;

		if(e.deltaY < 0){
			if(pageN > 0){
				pageN=pageN-1;
			}
			if(pageN >= 1){
				if(header_top.classList.contains("fixed") == false){
					header_top.classList.add("fixed");
					gsap.fromTo(header_top, {opacity: 0}, {opacity: 1, duration: 2});
				}
			}
		}
		else{
			if(pageN < total){
				pageN=pageN+1;
			}
			if(header_top.classList.contains("fixed") == true){
				gsap.fromTo(header_top, {opacity: 1}, {opacity: 0, duration: 0.6, onComplete: function(){
						header_top.classList.remove("fixed");
				}});
			}
		}
		pos=pageN*h;
		moving=true;

		gsap.to(window, {scrollTo: pos, duration: 0.8, onComplete: function(){
			if(pos == 0){
				header_top.classList.remove("fixed");
			}
			moving=false;
		}});

		for(let g=0; g < fpage.length; g++){

			if(pageN == g){
				fpage[g].classList.add("active");
			}
			else{
			}
		}
	});
	if(isMobile){
		header_top.classList.add("fixed");

		for(let g=0; g < fpage.length; g++){
			fpage[g].classList.add("active");
		}
	}
});