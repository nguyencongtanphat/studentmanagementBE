const hocsinh = require("./hocsinh");
const quatrinhhoc = require("./quatrinhhoc");
const khoilop = require("./khoilop");
const lop = require("./lop");
const hocky = require("./hocky");
const giaovien = require("./giaovien");
const ctbaocaotongketmon = require("./ctbaocaotongketmon");
const baocaotongketmon = require("./baocaotongketmon");
const bangdiemmon = require("./bangdiemmon");
const ctbangdiemmon = require("./ctbangdiemmon");
const loaikiemtra = require("./loaikiemtra");
const monhoc =  require("./monhoc.js");
const baocaotongkethocky = require("./baocaotongkethocky");

const associate = (_) => {
  //Hocsinh n-n lop (through quatrinhhoc)
  lop.belongsToMany(hocsinh, { through: { model: quatrinhhoc , unique: false } }); 
  hocsinh.belongsToMany(lop, { through: { model: quatrinhhoc , unique: false } });

  //khoilop 1-n lop
  khoilop.hasMany(lop, {
    foreignKey: "MaKhoi",
  }),
    lop.belongsTo(khoilop),
    // lop n - n baocaotongketmon (through ctbaocaotongketmon)
    lop.belongsToMany(baocaotongketmon, { through: ctbaocaotongketmon });
  baocaotongketmon.belongsToMany(lop, { through: ctbaocaotongketmon });

  //hocsinh n - n hocky (through quatrinhhoc)
  hocky.belongsToMany(hocsinh,  { through: { model: quatrinhhoc , unique: false } });
  hocsinh.belongsToMany(hocky,  { through: { model: quatrinhhoc , unique: false } });

  //hocky n - n giaovien (through quatrinhhoc)
  hocky.belongsToMany(giaovien, { through: { model: quatrinhhoc , unique: false } });
  giaovien.belongsToMany(hocky, { through: { model: quatrinhhoc , unique: false } });

  //hocky n - n lop (through quatrinhhoc)
  hocky.belongsToMany(lop, { through: { model: quatrinhhoc , unique: false } });
  lop.belongsToMany(hocky, { through: { model: quatrinhhoc , unique: false } });

  //giaovien n - n hocsinh (through quatrinhoc)
  giaovien.belongsToMany(hocsinh, { through: { model: quatrinhhoc , unique: false } });
  hocsinh.belongsToMany(giaovien, { through: { model: quatrinhhoc , unique: false } });

  //lop n - n giaovien
  lop.belongsToMany(giaovien, { through: { model: quatrinhhoc , unique: false } });
  giaovien.belongsToMany(lop, { through: { model: quatrinhhoc , unique: false } });

  //hocky n - n monhoc
  hocky.belongsToMany(monhoc, {through: baocaotongketmon});
  monhoc.belongsToMany(hocky, {through: baocaotongketmon});

  //monhoc n - n giaovien
  monhoc.belongsToMany(giaovien, {through: bangdiemmon});
  giaovien.belongsToMany(monhoc, {through: bangdiemmon});

  //monhoc n - n quatrinhhoc
  monhoc.belongsToMany(quatrinhhoc, {through: bangdiemmon});
  quatrinhhoc.belongsToMany(monhoc, {through: bangdiemmon});

  //giaovien n - n quatrinhhoc
  giaovien.belongsToMany(quatrinhhoc, {through: bangdiemmon});
  quatrinhhoc.belongsToMany(giaovien, {through: bangdiemmon});

  //bangdiemmon n - n loaikiemtra (through ctbangdiemmon)
  bangdiemmon.belongsToMany(loaikiemtra, { through: ctbangdiemmon });
  loaikiemtra.belongsToMany(bangdiemmon, { through: ctbangdiemmon });

  //lop n - n hocky (through baocaotongkethocky
  hocky.belongsToMany(lop, {through: baocaotongkethocky});
  lop.belongsToMany(hocky, {through: baocaotongkethocky}) 
  
};

module.exports = associate;
