## prototype.function
### YearType(year)
#### 判断是否为闰年 传入一个年份
### DayMonth(year,month)
#### 计算某一个月是多少天 传入一个年份一个月份
### zellerweek(year,month,day)
#### 计算某一天是星期几 传入一个年月日
### julianToDay(year,month,day)
#### 儒略历转换公历 传入一个儒略历
### dayToJulian(julianday)
#### 公历转儒略历 传入一个公历的年月日
- ### 儒略历用法须知
- #### 用儒略历计算可以很简单计算出日期差值
- #### 公历转儒略历 两日期之差即为公历之差
- #### 得到公历之差与其中一个，即可计算出另外一个

### defaultLeftBtn
#### 默认的左点击就是判断一些边界 例如1月份点左年份减1月份为12
### defaultRightBtn
#### 默认的右点击就是判断一些边界 例如12月份点右年份加1月份为1
### leftDays
#### 获得上一个月的日历
### rightDays
#### 获得下一个月的日历
### makeJson
#### 更改修改当前日历日期等等 修改实例
### removeEvent(obj)
#### 移除event
