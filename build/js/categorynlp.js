<<<<<<< HEAD
/*

Version : Plannee_demo_stank_fah_15082562

*/


function find_catagories(text) {
	var data_name = ["อาหาร และ เครื่องดื่ม", "การเดินทาง", "เครื่องแต่งกาย และ เครื่องประดับ", "ข้าวของเครื่องใช้ในชีวิตประจำวัน", "ความบันเทิง", "อื่นๆ"];
	var data = [
		["ข้าว", "ก๋วยเตี๋ยว", "หมู", "ไก่", "กุ้ง", "หมึก", "ปลา", "กั้ง", "ลูกชิ้น", "ไส้กรอก", "ผัก", "ผลไม้", "แตงโม", "ส้ม", "กล้วย", "สปาเกตตี้", "พิซซ่า", "น้ำ", "อาหาร", "ตำ", "แซ่บ", "ส้มตำ", "มะพร้าว", "ชา", "นม", "กิน", "กะเพรา", "ขนม", "ไข่", "กระเพรา", "เบียร์", "เหล้า"],
		["แท็กซี่", "รถเมล์", "bts", "mrt", "เรือด่วน", "รถไฟ", "เครื่องบิน", "รถตุ๊กๆ", "รถตู้", "รถ", "บีทีเอส", "จักรยาน", "สกู๊ตเตอร์", "มอไซ", "พี่วิน", "ปากซอย", "เดินทาง", "ไป", "ถนน"],
		["เสื้อ", "กางเกง", "ถุงเท้า", "รองเท้า", "หมวก", "ถุงมือ", "กำไล", "สร้อย", "แหวน", "ตุ้มหู", "ต่างหู", "เชิ้ต", "สูท", "ยีนส์", "แว่นตา", "แว่นตากันแดด"],
		["ทิชชู่", "ผงซักฟอก", "น้ำยาปรับผ้านุ่ม", "น้ำยาล้างจาน", "บุหรี่", "ครีมกันแดด", "แปรงสีฟัน", "ยาสีฟัน", "ยาสระผม", "ครีมนวดผม", "ยา", "กล่อง", "หม้อ", "ตะกร้า", "ล้อ", "ถุง", "เสื่อ", "หมอน", "มุ้ง", "เตียง", "เครื่อง", "กระทะ", "ตะหลิว", "ตู้", "ผ้า", "ยา"],
		["ภาพยนตร์", "เพลง", "ซีรีย์", "คอนเสิร์ต", "เกม", "คาราโอเกะ", "ไพ่", "หมากรุก", "มายากล", "นิยาย", "หนังสือ", "คอม", "โน๊ตบุ๊ค", "โทรทัศน์", "ทีวี", "อนิเม", "การ์ตูน", "ไอซ์สเกต", "พูล", "ผับ", "บาร์", "เที่ยวผู้ชาย", "หนัง", "เธอ"]
	];

=======
function split_and_find(arr)
{
	for(var i=0;i<arr.length;i++)
	{
		var ans = find_catagories(arr[i]);
		if(ans.typeOfText != '')
			return ans;
	}
	if (arr.length == 0) return false;
	return find_catagories(arr[0]);
}

function find_catagories(text)
{
	var wordcut = require("wordcut");
	wordcut.init();	
	var new_text = wordcut.cut(text).split("|");

	var data_name = ["อาหาร และ เครื่องดื่ม","การเดินทาง","เครื่องแต่งกาย และ เครื่องประดับ","ข้าวของเครื่องใช้ในชีวิตประจำวัน","ความบันเทิง","อื่นๆ"];
	var data = [
		[
			"ข้าว",
			"ก๋วยเตี๋ยว",
			"หมู",
			"ไก่",
			"กุ๋้ง",
			"หมึก",
			"ปลา	",
			"กั้ง",
			"ลูกชิ้น",
			"ไส้กรอก",
			"ผัก",
			"ผลไม้",
			"แตงโม",
			"ส้ม",
			"กล้วย",
			"สปาเกตตี้",
			"พิซซ่า",
			"น้ำ",
			"อาหาร",
			"ตำ",
			"แซ่บ",
			"ส้มตำ",
			"มะพร้าว",
			"ชา",
			"นม",
			"กิน",
			"กะเพรา"
		],

		[
			"แท็กซี่",
			"รถเมล์",
			"bts",
			"mrt",
			"เรือด่วน",
			"รถไฟ",
			"เครื่องบิน",
			"รถตุ๊กๆ",
			"รถตู้	",
			"รถ",
			"บีทีเอส",
			"จักรยาน",
			"สกู๊ตเตอร์",
			"มอไซ",
			"พี่วิน",
			"ปากซอย",
			"เดินทาง",
			"ไป",
			"ถนน"
		],

		[
			"เสื้อ",
			"กางเกง",
			"ถุงเท้า",
			"รองเท้า",
			"หมวก",
			"ถุงมือ",
			"กำไล",
			"สร้อย",
			"แหวน",
			"ตุ้มหู",
			"ต่างหู",
			"เชิ้ต",
			"สูท",
			"ยีนส์",
			"แว่นตา",
			"แว่นตากันแดด"
		],

		[
			"ทิชชู่",
			"ผงซักฟอก",
			"น้ำยาปรับผ้านุ่ม",
			"น้ำยาล้างจาน",
			"บุหรี่",
			"ครีมกันแดด",
			"แปรงสีฟัน",
			"ยาสีฟัน",
			"ยาสระผม",
			"ครีมนวดผม",
			"ยา",
			"กล่อง",
			"หม้อ",
			"ตะกร้า",
			"ล้อ",
			"ถุง",
			"เสื่อ",
			"หมอน",
			"มุ้ง",
			"เตียง",
			"เครื่อง",
			"กระทะ",
			"ตะหลิว",
			"ตู้",
			"ผ้า"
		],

		[
			"ภาพยนตร์	",
			"เพลง",
			"ซีรีย์	",
			"คอนเสิร์ต",
			"เกม",
			"คาราโอเกะ",
			"ไพ่",
			"หมากรุก",
			"มายากล",
			"นิยาย",
			"หนังสือ",
			"คอม",
			"โน๊ตบุ๊ค",
			"โทรทัศน์",
			"ทีวี",
			"อนิเม",
			"การ์ตูน",
			"ไอซ์สเกต",
			"พูล",
			"ผับ",
			"บาร์	",
			"เที่ยวผู้ชาย",
			"หนัง"
		]
	];
	/*
	
	var n = data.length;
	//console.log(data[0].length);
	
	for(var k=0;k<new_text.length;k++)
	{
		for(var i=0;i<n;i++)
		{
			for(var j=0;j<data[i].length;j++)
			if(data[i][j] == new_text[k])
			{
				return data_name[i];
			}
		}
	}
	Big O more than below*/
	
	//=========Fah part=======
>>>>>>> f31c12dc428da26d35fee84c028702ff8a7516e2
	var data_text = {
		typeOfText: '',
		text: '',
		price: 0
	}

<<<<<<< HEAD
	//clearing word in array text

	text = text.filter((value, index, arr) => {
		return value != "บาท"
	})
	for (var i = 0; i < text.length; i++)
		text[i] = text[i].trim()


	var key_receive = ["ได้", "รับ"]
	var val_receive = -1

	for (var i = 0; i < text.length; i++) {
		for (var j = 0; j < key_receive.length; j++)
			if (text[i] == key_receive[j]) {
				val_receive = 1
				break
			}
		if (val_receive == 1) break
	}


	//console.log(text)

	//checking type
	for (var k = 0; k < text.length; k++) {
		var check = false
		for (var i = 0; i < data.length; i++) {
			if (data[i].includes(text[k])) {
=======
	new_text = new_text.filter((value, index, arr) => {
		return value != " "
	})
	console.log(new_text)

	//checking type
	for (var k = 0; k < new_text.length; k++) 
	{
		var check = false
		for (var i = 0; i < data.length; i++) {
			if (data[i].includes(new_text[k].trim())) {
>>>>>>> f31c12dc428da26d35fee84c028702ff8a7516e2
				data_text.typeOfText = data_name[i]
				check = true
				break
			}
		}
		if (check) break
	}

<<<<<<< HEAD
	// add data
	data_text.text = text.slice(0, text.length - 1).join("")
	data_text.price = (val_receive) * parseInt(text[text.length - 1].split(',').join(""))


	return data_text;
}

function splitData(data) { //Split data by number
	const num = /[0-9]/
	var ins = 0;
	var dataAll = []
	for (var i = 0; i < data.length; i++) {
		if (num.test(data[i])) {
			dataAll.push(data.slice(ins, i + 1))
			ins = i + 1
		}
	}

	// for (var i = 0; i < data.length - 1; i++) {
	// 	if (num.test(data[i])) {
	// 		if (!num.test(data[i + 1])) {
	// 			dataAll.push(data.slice(ins, i + 1))
	// 			ins = i + 1
	// 		}
	// 	}
	// }

	//console.log(dataAll)
	return dataAll
}

function conclude_date(new_text) {
	var key_date = ["เมื่อ", "พรุ่งนี้", "มะรืน"]
	var key_val = [-1, 1, 2]
	//console.log(new_text)
	for (var i = 0; i < new_text.length; i++) {
		var word = new_text[i].trim()

		//console.log(word in key_date)
		for (var j = 0; j < key_date.length; j++)
			if (key_date[j] == word) {
				if (word == "เมื่อ")
					i++
				return [Next_Date(key_val[j]), i]
			}

	}
	return [Next_Date(0), -1]
}

function Next_Date(plus) {
	var today = new Date();

	var tomorrow = new Date();
	tomorrow.setDate(today.getDate() + plus);
	return { day: tomorrow.getDate(), month: tomorrow.getMonth() + 1, year: tomorrow.getFullYear() + 543 };
}

function dataS(text) { //main function for transaction
	var wordcut = require("wordcut");
	wordcut.init();
	var new_text = wordcut.cut(text).split("|");
	//console.log(new_text)
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
=======
	//adding price
	if (new_text.includes("บาท")) {
		data_text.price = parseInt(new_text[new_text.indexOf("บาท") - 1])
		data_text.text = new_text.slice(0, new_text.indexOf("บาท") - 1).join("")

	}
	else {
		data_text.price = parseInt(new_text[new_text.length - 1])
		data_text.text = new_text.slice(0, new_text.length - 1).join("")
	}
	return data_text;
>>>>>>> f31c12dc428da26d35fee84c028702ff8a7516e2
}