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
	var data_text = {
		typeOfText: '',
		text: '',
		price: 0
	}

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
				data_text.typeOfText = data_name[i]
				check = true
				break
			}
		}
		if (check) break
	}

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
}