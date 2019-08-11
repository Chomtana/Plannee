

export default function monthi2text(monthi) {
  //console.log(monthi);
  switch (monthi) {
    case 1: return "มกราคม";
    case 2: return "กุมภาพันธ์";
    case 3: return "มีนาคม";
    case 4: return "เมษายน";
    case 5: return "พฤษภาคม";
    case 6: return "มิถุนายน";
    case 7: return "กรกฎาคม";
    case 8: return "สิงหาคม";
    case 9: return "กันยายน";
    case 10: return "ตุลาคม";
    case 11: return "พฤศจิกายน";
    case 12: return "ธันวาคม";
  }
  throw new Error("Unknown monthi: "+monthi);
}