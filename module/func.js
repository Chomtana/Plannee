function find_catagories(text) {
	//Data
	// console.log(text)
	var data_name = ["อาหาร", "การเดินทาง", "เครื่องแต่งกายและเครื่องประดับ", "ข้าวของเครื่องใช้ในชีวิตประจำวัน", "ความบันเทิง"];
	var data = [
		["ข้าว", "ก๋วยเตี๋ยว", "หมู", "ไก่", "กุ๋้ง", "หมึก", "ปลา", "กั้ง", "ลูกชิ้น", "ไส้กรอก", "ผัก", "ผลไม้", "แตงโม", "ส้ม", "กล้วย", "สปาเกตตี้", "พิซซ่า", "น้ำ", "อาหาร", "ตำ", "แซ่บ", "ส้มตำ", "มะพร้าว", "ชา", "นม", "กิน", "กะเพรา", "ขนม"],
		["แท็กซี่", "รถเมล์", "bts", "mrt", "เรือด่วน", "รถไฟ", "เครื่องบิน", "รถตุ๊กๆ", "รถตู้", "รถ", "บีทีเอส", "จักรยาน", "สกู๊ตเตอร์", "มอไซ", "พี่วิน", "ปากซอย", "เดินทาง", "ไป", "ถนน"],
		["เสื้อ", "กางเกง", "ถุงเท้า", "รองเท้า", "หมวก", "ถุงมือ", "กำไล", "สร้อย", "แหวน", "ตุ้มหู", "ต่างหู", "เชิ้ต", "สูท", "ยีนส์", "แว่นตา", "แว่นตากันแดด"],
		["ทิชชู่", "ผงซักฟอก", "น้ำยาปรับผ้านุ่ม", "น้ำยาล้างจาน", "บุหรี่", "ครีมกันแดด", "แปรงสีฟัน", "ยาสีฟัน", "ยาสระผม", "ครีมนวดผม", "ยา", "กล่อง", "หม้อ", "ตะกร้า", "ล้อ", "ถุง", "เสื่อ", "หมอน", "มุ้ง", "เตียง", "เครื่อง", "กระทะ", "ตะหลิว", "ตู้", "ผ้า"],
		["ภาพยนตร์", "เพลง", "ซีรีย์", "คอนเสิร์ต", "เกม", "คาราโอเกะ", "ไพ่", "หมากรุก", "มายากล", "นิยาย", "หนังสือ", "คอม", "โน๊ตบุ๊ค", "โทรทัศน์", "ทีวี", "อนิเม", "การ์ตูน", "ไอซ์สเกต", "พูล", "ผับ", "บาร์", "เที่ยวผู้ชาย", "หนัง"]
	];
	var data_text = {
		typeOfText: '',
		text: '',
		price: 0
	}
	console.log(text)
	/*
	if (text[0] == "บาท") {
		delete (text[0])
	}
	*/

	text = text.filter((value, index, arr) => {
		return value != "บาท"
	})

	for (var i = 0; i < text.length; i++)
		text[i] = text[i].trim()

	//checking type
	for (var k = 0; k < text.length; k++) {
		var check = false
		for (var i = 0; i < data.length; i++) {
			if (data[i].includes(text[k])) {
				data_text.typeOfText = data_name[i]
				check = true
				break
			}
		}
		if (check) break
	}
	//adding price
	data_text.text = text.slice(0, text.length - 1).join("")

	var stank_trans_lek = function (word) {
		var tp = ""
		for (var i = 0; i < word.length; i++)
			if (word[i] != ",")
				tp += word[i]
		return parseInt(tp)
	}
	console.log(text[text.length - 1])
	data_text.price = stank_trans_lek(text[text.length - 1])
	return data_text;
}

function readTextFile(file) {
	fetch("Words.txt")
		.then(res => {
			console.log(res)
		})
		.then(text => {
			console.log(text)
		})
}

function splitData(data) { //Split data by number
	const num = /[0-9]/
	var ins = 0;
	var dataAll = []
	for (var i = 0; i < data.length; i++) {
		if (num.test(data[i])) {
			{
				dataAll.push(data.slice(ins, i + 1))
				ins = i + 1
			}
		}
	}
	console.log(dataAll)
	return dataAll
}

function conclude_date(new_text) {
	var key_date = ["เมื่อ", "พรุ่งนี้", "มะรืน"]
	var key_val = [-1, 1, 2]
	console.log(new_text)
	for (var i = 0; i < new_text.length; i++) {
		var word = new_text[i].trim()

		console.log(word in key_date)
		for (var j = 0; j < key_date.length; j++)
			if (key_date[j] == word) {
				if (word == "เมื่อ") i++
				return [Next_Date(key_val[j]), i]
			}

		/*
		if( i > 0 && word == "วัน")
			return Next_Date(-parseInt(new_text[i-1]))
		*/
	}
	return [Next_Date(0), -1]
}

function Next_Date(plus) {
	var today = new Date();
	var thisDate = today.getDate();
	var thisMonth = today.getMonth() + 1;
	var thisYear = today.getFullYear();
	var days = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	var total = 365;

	var leap_year = function (thisYear) {
		return thisYear % 4 == 0 || (thisYear % 100 == 0 && thisYear % 400 == 0)
	}

	days[2] += leap_year(thisYear);
	total += leap_year(thisYear);


	var q_days = days
	for (var i = 1; i < q_days.length; i++)
		q_days[i] += q_days[i - 1];

	var sum = thisDate + plus + q_days[thisMonth - 1];
	var NextDate = -1, NextMonth = -1, NextYear = -1;

	for (var i = 12; i >= 0; i--) {
		if (sum > q_days[i]) {
			NextDate = sum - q_days[i];
			NextMonth = i + 1;
			NextYear = thisYear;
			break;
		}
	}

	return { day: NextDate, month: NextMonth, year: NextYear + 543 };
}

function dataS(text) { //main function for transaction
	var wordcut = require("wordcut");
	wordcut.init();
	var new_text = wordcut.cut(text).split("|");
	console.log(new_text)
	new_text = new_text.filter((value, index, arr) => {
		return value != " "
	})
	//readTextFile("Words.txt")
	// console.log(readTextFile())
	var data = []

	var Date_val = conclude_date(new_text)

	new_text = new_text.splice(Date_val[1] + 1, new_text.length)


	splitData(new_text).forEach(e => {
		var temp_dat = find_catagories(e)
		temp_dat["date"] = Date_val[0]
		data.push(temp_dat)
	})
	//console.log(data)

	return data
}
