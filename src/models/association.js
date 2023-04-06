const hocsinh = require("./hocsinh");
const quatrinhhoc = require("./quatrinhhoc");
const khoilop = require("./khoilop");
const lop = require("./lop");
const hocky = require("./hocky");
const giaovien = require("./giaovien");
const ctbaocaotongketmon = require("./ctbaocaotongketmon");
const baocaotongketmon = require("./baocaotongketmon"); ///

const associate = (_) => {
  //Hocsinh n-n lop (through quatrinhhoc)
  lop.belongsToMany(hocsinh, { through: quatrinhhoc });
  hocsinh.belongsToMany(lop, { through: quatrinhhoc });
  //khoilop 1-n lop
  khoilop.hasMany(lop, {
    foreignKey: "MaKhoi",
  }),
    lop.belongsTo(khoilop),
    // lop n - n baocaotongketmon (through ctbaocaotongketmon)
    lop.belongsToMany(baocaotongketmon, { through: ctbaocaotongketmon });
  baocaotongketmon.belongsToMany(lop, { through: ctbaocaotongketmon });
  //hocky n - n hocsinh (through quatrinhhoc)
  hocky.belongsToMany(hocsinh, { through: quatrinhhoc });
  hocsinh.belongsToMany(hocky, { through: quatrinhhoc });
  //quatrinhhoc n - 1 giaovien
  giaovien.hasMany(quatrinhhoc, {
    foreignKey: "MaGV",
  }),
    quatrinhhoc.belongsTo(giaovien);
};

module.exports = associate;
