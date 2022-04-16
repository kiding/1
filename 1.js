var chars = ["1", "일"]
var elems = []
var duration = 10

function text() {
	var e = document.createElement("span")
	var ze = $(e)
	var zc = $("#c")

	var t = chars[Math.floor((Math.random()*chars.length*10))%(chars.length)]
	e.innerHTML = t

	ze.addClass("a")

	var left = 0
	var top = 0
	var size = zc.height() * ((Math.random()*100)+50) / 100

	if(($(".a").length)) {
		left = (Math.random()*100)-40
		top = (Math.random()*100)-40
	} else {
		left = 50
		top = 50
		ze.css("marginLeft", "-" + size / 2 + "px")
		ze.css("marginTop", "-" + (size / 2 - size * 0.06) + "px")
	}

	ze.css("left", left + "%");
	ze.css("top", top + "%")
	ze.css("fontSize", size + "px")
	ze.css("width", size + "px")
	ze.css("height", size + "px")
	ze.css("color", "rgb(255, 255, 255)")

	ze.css("webkitTransitionDuration", duration)
	ze.css("transitionDuration", duration)

	zc.append(e)
	elems.push(e)

	setTimeout(function(){
		ze.toggleClass("b")
	}, 1000)
}

function color() {
	var bg = $("#b")
	var a = $(".a")
	var b = $(".b")
	var l = 11.3 * 1000
	var bgOpacity = bg.css("opacity") == 0 ? 1 : 0;
	bg.animate({"opacity":bgOpacity}, l)

	if(elems.length) {
		const r = Math.floor((Math.random() * 255));
		const g = Math.floor((Math.random() * 255));
		const b = Math.floor((Math.random() * 255));

		setTimeout(function(){
			elems.forEach(function(item, index, array) {
				if($(item).css("color") == "rgb(255, 255, 255)") {
					$(item).animate({color:`rgb(${r}, ${g}, ${b})`}, l/2)
				}
			})
		}, l/2)
	}
}

var a = document.createElement("audio")

var b = document.createElement("source")
b.src = "bgm.mp3"
b.type = "audio/mpeg"

var c = document.createElement("source")
c.src = "bgm.opus"
c.type = "audio/ogg"

function m() {
	var t = document.getElementById("title")
	t.removeEventListener("mouseup", m, false)

	a.autoplay = true
	a.loop = true

	try {
		a.appendChild(b)
		a.appendChild(c)
	} catch (e) {
		alert("Not supported.")
		return;
	}

	a.play()

	t.innerHTML = "잠깐만"
	$(t).css("-webkit-animation-name", "flicker")
	$(t).css("-webkit-animation-duration", "2s")
	$(t).css("-webkit-animation-iteration-count", "infinite")
	
	$(t).css("animation-name", "flicker")
	$(t).css("animation-duration", "2s")
	$(t).css("animation-iteration-count", "infinite")

	var p = setInterval(function() {
		if(a.currentTime <= 0.1)
			return;

		clearInterval(p)

		$(t).css("display", "none")
		color()

		var i;
		var f = function () {
			clearInterval(i)
			color() 

			setTimeout(function() {
				text()
				i = setInterval(text, 4 * 1000)
			}, 10 * 1000)

			setTimeout(function() {
				clearInterval(i)
			}, 61 * 1000)
		}

		f()
		setInterval(f, 66 * 1000)
	}, 500);
}

function init() {
	var t = document.getElementById("title")
	$(t).animate({opacity: 1}, 1000, 'linear', function() {
		t.addEventListener("click", m, true)
	})
}
