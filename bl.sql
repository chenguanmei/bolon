SET NAMES UTF8;
DROP DATABASE IF EXISTS bl;
CREATE DATABASE bl CHARSET=UTF8;
USE bl;
/**用户表**/
CREATE TABLE user(
  uid INT PRIMARY KEY AUTO_INCREMENT,  #用户id
  phone VARCHAR(16) UNIQUE,            #手机号
  upwd VARCHAR(12)                     #密码
);
/**商品信息表**/
CREATE TABLE glass(
  lid INT PRIMARY KEY AUTO_INCREMENT,  #商品编号
  fname VARCHAR(32),                   #所属型号
  title VARCHAR(128),                  #标题
  catagory VARCHAR(32),                #品类
  style VARCHAR(32),                   #款式
  texture VARCHAR(32),                 #材质
  shape VARCHAR(32),                   #框型
  color VARCHAR(32),                   #颜色
  price DECIMAL(10,2),                 #价格
  sm VARCHAR(128),                     #小图片路径
  md VARCHAR(128),                     #中图片路径
  lg VARCHAR(128)                      #大图片路径
);
/**插入用户表**/
INSERT INTO user VALUES
(1,13859671111,123456),
(2,13859671112,123456),
(3,13859671113,123456),
(4,13859671114,123456),
(5,13859671115,123456),
(6,13859671116,123456),
(7,13859671117,123456),
(8,13859671118,123456),
(9,13859671119,123456),
(10,13859671110,123456);
/*插入商品表*/
INSERT INTO glass VALUES
(1,'BC7003','BC7003男士太阳镜潮流款金属圆形黑色','男士太阳镜','潮流款','金属','圆形','黑色',359,'img/10.jpg','img/10.jpg','img/10.jpg'),
(2,'BC7003','BC7003男士太阳镜潮流款金属圆形橘色','男士太阳镜','潮流款','金属','圆形','橘色',359,'img/11.jpg','img/11.jpg','img/11.jpg'),
(3,'BC7003','BC7003男士太阳镜潮流款金属圆形玫红色','男士太阳镜','潮流款','金属','圆形','玫红色',359,'img/12.jpg','img/12.jpg','img/12.jpg'),
(4,'BC7003','BC7003男士太阳镜潮流款金属圆形黄色','男士太阳镜','潮流款','金属','圆形','黄色',359,'img/13.jpg','img/13.jpg','img/13.jpg'),
(5,'BC7003','BC7003男士太阳镜潮流款金属圆形蓝色','男士太阳镜','潮流款','金属','圆形','蓝色',359,'img/14.jpg','img/14.jpg','img/14.jpg'),
(6,'BL5002','BL5002女士光学镜复古款弹力钢圆形棕色','女士光学镜','复古款','弹力钢','圆形','棕色',360,'img/21.jpg','img/21.jpg','img/21.jpg'),
(7,'BL5002','BL5002女士光学镜复古款弹力钢圆形银色','女士光学镜','复古款','弹力钢','圆形','银色',360,'img/22.jpg','img/22.jpg','img/22.jpg'),
(8,'BL5002','BL5002女士光学镜复古款弹力钢圆形粉红色','女士光学镜','复古款','弹力钢','圆形','粉红色',360,'img/23.jpg','img/23.jpg','img/23.jpg'),
(9,'BL5002','BL5002女士光学镜复古款弹力钢圆形金色','女士光学镜','复古款','弹力钢','圆形','金色',360,'img/24.jpg','img/24.jpg','img/24.jpg'),
(10,'BJ1037','BJ1037女士太阳镜复古款TR多边形黄色','女士太阳镜','复古款','TR','多边形','黄色',361,'img/91.jpg','img/91.jpg','img/91.jpg'),
(11,'BJ1037','BJ1037女士太阳镜复古款TR多边形粉色','女士太阳镜','复古款','TR','多边形','粉色',361,'img/92.jpg','img/92.jpg','img/92.jpg'),
(12,'BJ1037','BJ1037女士太阳镜复古款TR多边形玫红色','女士太阳镜','复古款','TR','多边形','玫红色',361,'img/93.jpg','img/93.jpg','img/93.jpg'),
(13,'BJ1037','BJ1037女士太阳镜复古款TR多边形黑色','女士太阳镜','复古款','TR','多边形','黑色',361,'img/94.jpg','img/94.jpg','img/94.jpg'),
(14,'BM1205','BM1205男士光学镜经典款铝镁方形金色','男士光学镜','经典款','铝镁','方形','金色',362,'img/51.jpg','img/51.jpg','img/51.jpg'),
(15,'BM1205','BM1205男士光学镜经典款铝镁方形黑色','男士光学镜','经典款','铝镁','方形','黑色',362,'img/52.jpg','img/52.jpg','img/52.jpg'),
(16,'BM1205','BM1205男士光学镜经典款铝镁方形棕色','男士光学镜','经典款','铝镁','方形','棕色',362,'img/53.jpg','img/53.jpg','img/53.jpg'),
(17,'BM1205','BM1205男士光学镜经典款铝镁方形蓝色','男士光学镜','经典款','铝镁','方形','蓝色',362,'img/54.jpg','img/54.jpg','img/54.jpg');

#购物车
CREATE TABLE cart(
  id INT PRIMARY KEY AUTO_INCREMENT,
  lid INT,
  count INT
);
INSERT INTO cart VALUES(NULL,1,2);
INSERT INTO cart VALUES(NULL,2,3);
INSERT INTO cart VALUES(NULL,3,2);