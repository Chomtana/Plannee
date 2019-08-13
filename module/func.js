function find_catagories(text) {
	//Data
	// console.log(text)
	var data_name = ["อาหาร", "การเดินทาง", "เครื่องแต่งกายและเครื่องประดับ", "ข้าวของเครื่องใช้ในชีวิตประจำวัน", "ความบันเทิง"];
	var data = [
		["ข้าว", "ก๋วยเตี๋ยว", "หมู", "ไก่", "กุ๋้ง", "หมึก", "ปลา", "กั้ง", "ลูกชิ้น", "ไส้กรอก", "ผัก", "ผลไม้", "แตงโม", "ส้ม", "กล้วย", "สปาเกตตี้", "พิซซ่า", "น้ำ", "อาหาร", "ตำ", "แซ่บ", "ส้มตำ", "มะพร้าว", "ชา", "นม", "กิน", "กะเพรา"],
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
	if (text[0] == "บาท") {
		delete (text[0])
	}
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
	data_text.price = parseInt(text[text.length - 1].split(",").join(""))
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

function splitData(data) {
	const num = /[0-9]/
	var ins = 0;
	var dataAll = []
	for (var i = 0; i < data.length - 1; i++) {
		if (num.test(data[i])) {
			if (!num.test(data[i + 1])) {
				dataAll.push(data.slice(ins, i + 1))
				ins = i + 1
			}
		}
	}
	// console.log(dataAll)
	return dataAll
}

function dataS(text) {
	var wordcut = require("wordcut");
	wordcut.init();
	var new_text = wordcut.cut(text).split("|");
	new_text = new_text.filter((value, index, arr) => {
		return value != " "
	})
	var data = []
	readTextFile("Words.txt")
	// console.log(readTextFile())
	splitData(new_text).forEach(e => {
		data.push(find_catagories(e))
	})
	console.log(data)
}