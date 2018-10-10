t = {
    "OPT": {
        "CS_DAT": {
            "提款": {
                "看电视": {
                    "Na": "看电视",
                    "预留存款": 3600,
                    "元素": ["提款_看电视"],
                    "版本": 1001
                },
                "玩手机": {
                    "Na": "玩手机,ipad",
                    "预留存款": 1800,
                    "元素": ["提款_玩手机"],
                    "版本": 1001
                },
                "临时": {
                    "Na": "临时提款( 1小时 )",
                    "预留存款": 600,
                    "元素": ["提款_临时"],
                    "版本": 1001
                }
            },
            "任务": {
                "起床": {
                    "Na": "起床",
                    "元素": ["起床", "刷牙", "洗脸", "吃早餐_喝水", "换衣服鞋子"],
                    "启动时间段": "6:30",
                    "条件": {
                        "存款": 1200
                    }
                },
                "中饭": {
                    "Na": "吃中饭",
                    "元素": ["吃中饭"],
                    "启动时间段": "12:00",
                    "条件": {}
                },
                "晚饭": {
                    "Na": "吃晚饭",
                    "元素": ["吃晚饭"],
                    "启动时间段": "19:00",
                    "条件": {}
                },
                "洗澡": {
                    "Na": "洗澡",
                    "元素": ["洗澡准备", "洗澡"],
                    "启动时间段": "21:00",
                    "条件": {
                        "存款": 1200
                    }
                },
                "刷牙睡觉": {
                    "Na": "刷牙睡觉",
                    "元素": ["a4准备刷牙_晚上", "刷牙", "洗脸"],
                    "启动时间段": "21:30",
                    "条件": {
                        "存款": 600
                    }
                },
                "临时": {
                    "Na": "临时剧本",
                    "元素": ["临时x"]
                }
            },
            "元素": {
                "临时x": {
                    "Na": "临时任务",
                    "时长": 60,
                    "声音": {
                        "10": {
                            "key": "不限句数",
                            "arr": ["最后30秒", "最后1分钟", "时间过了一半", "最后3分钟", "最后5分钟", "还剩10分钟", "每5分钟", "每1分钟"]
                        }
                    }
                },
                "提款_看电视": {
                    "Na": "看电视",
                    "时长": 3600,
                    "声音": {
                        "10": {
                            "key": "不限句数",
                            "arr": ["最后5分钟", "最后1分钟", "提款_家长要带上手机"]
                        }
                    }
                },
                "提款_玩手机": {
                    "Na": "玩手机",
                    "时长": 1800,
                    "声音": {
                        "10": {
                            "key": "不限句数",
                            "arr": ["最后5分钟", "最后1分钟", "提款_家长要带上手机"]
                        }
                    }
                },
                "提款_临时": {
                    "Na": "临时提款",
                    "时长": 3600,
                    "声音": {
                        "10": {
                            "key": "不限句数",
                            "arr": ["每5分钟", "提款_家长要带上手机"]
                        }
                    }
                },
                "起床": {
                    "Na": "起床",
                    "时长": 300,
                    "声音": {
                        "0": {
                            "key": "不限句数",
                            "arr": ["最后30秒", "最后1分钟", "每1分钟"]
                        },
                        "5": {
                            "key": "最少一句",
                            "arr": ["起床了"]
                        },
                        "25": {
                            "key": "最多一句",
                            "arr": ["早上事情特别多", "赶紧上个厕所_准备刷牙"]
                        },
                        "125": {
                            "key": "最多一句",
                            "arr": ["准备好就开始刷牙"]
                        }
                    }
                },
                "刷牙": {
                    "Na": "刷牙洗脸 [开始]",
                    "时长": 240,
                    "声音": {
                        "0": {
                            "key": "不限句数",
                            "arr": ["每1分钟"]
                        },
                        "1": {
                            "key": "禁止提前"
                        },
                        "2": {
                            "key": "最少一句",
                            "arr": ["刷牙开始"]
                        },
                        "30": {
                            "key": "最多一句",
                            "arr": ["刷牙注意", "刷牙闲聊"]
                        },
                        "75": {
                            "key": "最多一句",
                            "arr": ["存款的规则1"]
                        },
                        "180": {
                            "key": "最少一句",
                            "arr": ["刷牙时间够了"]
                        }
                    }
                },
                "洗脸": {
                    "Na": "洗脸",
                    "时长": 120,
                    "声音": {
                        "0": {
                            "key": "不限句数",
                            "arr": ["最后30秒", "最后1分钟"]
                        },
                        "2": {
                            "key": "最少一句",
                            "arr": ["洗脸开始"]
                        },
                        "35": {
                            "key": "最多一句",
                            "arr": ["一次洗不干净"]
                        },
                        "65": {
                            "key": "最多一句",
                            "arr": ["毛巾要拧干"]
                        }
                    }
                },
                "吃早餐_喝水": {
                    "Na": "吃早餐,喝水",
                    "时长": 900,
                    "声音": {
                        "0": {
                            "key": "不限句数",
                            "arr": ["最后1分钟", "时间过了一半", "最后3分钟", "最后5分钟", "每1分钟"]
                        },
                        "2": {
                            "key": "最少一句",
                            "arr": ["早餐开始"]
                        },
                        "35": {
                            "key": "最多一句",
                            "arr": ["抓紧时间吃早餐", "早餐的重要性"]
                        },
                        "125": {
                            "key": "最少一句",
                            "arr": ["早上喝水"]
                        },
                        "305": {
                            "key": "最多一句",
                            "arr": ["早餐闲聊", "存款的规则1"]
                        }
                    }
                },
                "换衣服鞋子": {
                    "Na": "换衣服",
                    "时长": 480,
                    "声音": {
                        "0": {
                            "key": "不限句数",
                            "arr": ["最后1分钟", "时间过了一半", "最后3分钟", "最后5分钟", "每1分钟"]
                        },
                        "2": {
                            "key": "最少一句",
                            "arr": ["换衣服鞋子开始"]
                        },
                        "125": {
                            "key": "最多一句",
                            "arr": ["做备忘录"]
                        }
                    }
                },
                "吃中饭": {
                    "Na": "开始吃饭",
                    "时长": 1500,
                    "声音": {
                        "0": {
                            "key": "不限句数",
                            "arr": ["最后30秒", "最后1分钟", "时间过了一半", "最后3分钟", "最后5分钟", "还剩10分钟", "每5分钟", "每1分钟"]
                        },
                        "2": {
                            "key": "最少一句",
                            "arr": ["吃饭开始"]
                        },
                        "185": {
                            "key": "最多一句",
                            "arr": ["饭前定量", "其他吃饭建议"]
                        },
                        "605": {
                            "key": "最多一句",
                            "arr": ["饭间闲聊", "存款的规则1"]
                        }
                    }
                },
                "吃晚饭": {
                    "Na": "开始吃饭",
                    "时长": 1500,
                    "声音": {
                        "0": {
                            "key": "不限句数",
                            "arr": ["最后30秒", "最后1分钟", "时间过了一半", "最后3分钟", "最后5分钟", "还剩10分钟", "每5分钟", "每1分钟"]
                        },
                        "2": {
                            "key": "最少一句",
                            "arr": ["吃饭开始"]
                        },
                        "185": {
                            "key": "最多一句",
                            "arr": ["饭前定量", "其他吃饭建议"]
                        },
                        "605": {
                            "key": "最多一句",
                            "arr": ["饭间闲聊", "存款的规则1"]
                        }
                    }
                },
                "洗澡准备": {
                    "Na": "准备洗澡",
                    "时长": 120,
                    "声音": {
                        "0": {
                            "key": "不限句数",
                            "arr": ["最后30秒", "最后1分钟"]
                        },
                        "2": {
                            "key": "最多一句",
                            "arr": ["洗澡准备"]
                        },
                        "45": {
                            "key": "最少一句",
                            "arr": ["不要带手机去洗澡"]
                        }
                    },
                    "提前": ["提前"],
                    "延迟": ["延迟"]
                },
                "洗澡": {
                    "Na": "洗澡 [开始]",
                    "时长": 900,
                    "声音": {
                        "0": {
                            "key": "不限句数",
                            "arr": ["最后5分钟", "还剩10分钟", "最后1分钟", "每5分钟"]
                        },
                        "2": {
                            "key": "最少一句",
                            "arr": ["洗澡开始"]
                        }
                    }
                },
                "a4准备刷牙_晚上": {
                    "Na": "准备刷牙",
                    "时长": 90,
                    "声音": {
                        "0": {
                            "key": "不限句数",
                            "arr": ["最后30秒", "最后1分钟"]
                        },
                        "5": {
                            "key": "最多一句",
                            "arr": ["刷牙准备"]
                        }
                    }
                }
            },
            "声音": {
                "提款_家长要带上手机": {
                    "exec": [{
                        "fun": "几率_一定播放"
                    }],
                    "URLs": ["提款提醒1", "提款提醒2", "提款提醒3"],
                    "版本": "1"
                },
                "最后30秒": {
                    "exec": [{
                        "fun": "不重复占用时刻"
                    }, {
                        "fun": "元素时长大于",
                        "dat": {
                            "时长": 50
                        }
                    }, {
                        "fun": "倒设_时刻",
                        "dat": {
                            "时刻": 30
                        }
                    }],
                    "URLs": ["l30s1", "l30s2", "l30s3", "l30s4", "l30s5"],
                    "版本": "1"
                },
                "最后1分钟": {
                    "exec": [{
                        "fun": "不重复占用时刻"
                    }, {
                        "fun": "元素时长大于",
                        "dat": {
                            "时长": 150
                        }
                    }, {
                        "fun": "倒设_时刻",
                        "dat": {
                            "时刻": 60
                        }
                    }],
                    "URLs": ["l60s1", "l60s2", "l60s3", "l60s4"],
                    "版本": "1"
                },
                "时间过了一半": {
                    "exec": [{
                        "fun": "不重复占用时刻"
                    }, {
                        "fun": "元素时长大于",
                        "dat": {
                            "时长": 50
                        }
                    }, {
                        "fun": "设置_时刻_一半"
                    }],
                    "URLs": ["sjgyb1", "sjgyb2", "sjgyb3"],
                    "版本": "1"
                },
                "最后3分钟": {
                    "exec": [{
                        "fun": "不重复占用时刻"
                    }, {
                        "fun": "元素时长大于",
                        "dat": {
                            "时长": 300
                        }
                    }, {
                        "fun": "倒设_时刻",
                        "dat": {
                            "时刻": 180
                        }
                    }],
                    "URLs": ["l3m1", "l3m2", "l3m3", "l3m4", "l3m5", "l3m6"],
                    "版本": "1"
                },
                "最后5分钟": {
                    "exec": [{
                        "fun": "不重复占用时刻"
                    }, {
                        "fun": "元素时长大于",
                        "dat": {
                            "时长": 480
                        }
                    }, {
                        "fun": "倒设_时刻",
                        "dat": {
                            "时刻": 300
                        }
                    }],
                    "URLs": ["l5m1", "l5m2", "l5m3"],
                    "版本": "1"
                },
                "还剩10分钟": {
                    "exec": [{
                        "fun": "不重复占用时刻"
                    }, {
                        "fun": "元素时长大于",
                        "dat": {
                            "时长": 720
                        }
                    }, {
                        "fun": "倒设_时刻",
                        "dat": {
                            "时刻": 600
                        }
                    }],
                    "URLs": ["l10m1", "l10m2", "l10m3", "l10m4", "l10m5", "l10m6", "l10m7", "l10m8", "l10m9", "l10m10"],
                    "版本": "1"
                },
                "每1分钟": {
                    "exec": [{
                        "fun": "不重复占用时刻"
                    }, {
                        "fun": "元素时长大于",
                        "dat": {
                            "时长": 120
                        }
                    }, {
                        "fun": "时刻循环",
                        "dat": {
                            "间距": 60,
                            "结尾留空": 90
                        }
                    }],
                    "URLs": ["o1m1", "o1m2"],
                    "版本": "1"
                },
                "每5分钟": {
                    "exec": [{
                        "fun": "不重复占用时刻"
                    }, {
                        "fun": "元素时长大于",
                        "dat": {
                            "时长": 600
                        }
                    }, {
                        "fun": "时刻循环",
                        "dat": {
                            "间距": 300,
                            "结尾留空": 150
                        }
                    }],
                    "URLs": ["o5m1", "o5m2", "o5m3", "o5m4", "o5m5", "o5m6"],
                    "版本": "1"
                },
                "起床了": {
                    "exec": [{
                        "fun": "几率_一定播放"
                    }],
                    "URLs": ["qcl1", "qcl2", "qcl3", "qcl4", "qcl7", "qcl5", "qcl6"],
                    "顺序": "循环"
                },
                "赶紧上个厕所_准备刷牙": {
                    "exec": [{
                        "fun": "几率_一定播放"
                    }],
                    "URLs": ["zsscs1", "zsscs2", "zsscs3", "zsscs6"],
                    "版本": "1"
                },
                "早上事情特别多": {
                    "exec": [{
                        "fun": "几率_一定播放"
                    }],
                    "URLs": ["zssqtbd1", "zssqtbd2", "zssqtbd3"],
                    "版本": "1"
                },
                "准备好就开始刷牙": {
                    "exec": [{
                        "fun": "几率_一定播放"
                    }],
                    "URLs": ["xyzb1", "xyzb2"],
                    "版本": "1"
                },
                "刷牙开始": {
                    "exec": [{
                        "fun": "几率_一定播放"
                    }],
                    "URLs": ["syks1", "syks1", "syks1", "syks2", "syks2", "syks2", "syks3"]
                },
                "刷牙注意": {
                    "exec": [{
                        "fun": "几率_一定播放"
                    }],
                    "URLs": ["xyzy1", "xyzy2", "xyzy3", "xyzy5", "xyzy6", "xyzy8"],
                    "版本": "1"
                },
                "刷牙闲聊": {
                    "exec": [{
                        "fun": "几率_一定播放"
                    }],
                    "URLs": ["xyxl1", "xyxl2", "xyxl3", "xyxl4", "xyxl8"],
                    "版本": "1"
                },
                "刷牙时间够了": {
                    "exec": [{
                        "fun": "几率_一定播放"
                    }],
                    "URLs": ["xyjs1", "xyjs2", "xyjs3"],
                    "版本": "1"
                },
                "洗脸开始": {
                    "exec": [{
                        "fun": "几率_一定播放"
                    }],
                    "URLs": ["xlks1", "xlks2"]
                },
                "一次洗不干净": {
                    "exec": [{
                        "fun": "几率_一定播放"
                    }],
                    "URLs": ["xlylc1", "xlylc2", "xlylc3", "xlylc4"],
                    "版本": "1"
                },
                "毛巾要拧干": {
                    "exec": [{
                        "fun": "几率_一定播放"
                    }],
                    "URLs": ["mjylg1", "mjylg2", "mjylg3", "mjylg4", "mjylg6", "mjylg7"],
                    "版本": "1"
                },
                "早餐开始": {
                    "exec": [{
                        "fun": "几率_一定播放"
                    }],
                    "URLs": ["zcks1", "zcks2", "zcks3", "zcks4", "zcks5"],
                    "版本": "1"
                },
                "抓紧时间吃早餐": {
                    "exec": [{
                        "fun": "几率_一定播放"
                    }],
                    "URLs": ["zcsj1", "zcsj2", "zcsj3"],
                    "版本": "1"
                },
                "早餐的重要性": {
                    "exec": [{
                        "fun": "几率_一定播放"
                    }],
                    "URLs": ["zczy1", "zczy2", "zczy3"],
                    "版本": "1"
                },
                "早上喝水": {
                    "exec": [{
                        "fun": "几率_一定播放"
                    }],
                    "URLs": ["zshs1", "zshs2", "zshs3", "zshs4", "zshs5"],
                    "版本": "1"
                },
                "早餐闲聊": {
                    "exec": [{
                        "fun": "几率_一定播放"
                    }],
                    "URLs": ["zcxl1", "zcxl2", "zcxl3", "zcxl4", "zcxl5", "zcxl6", "zcxl7"],
                    "版本": "1"
                },
                "换衣服鞋子开始": {
                    "exec": [{
                        "fun": "几率_一定播放"
                    }],
                    "URLs": ["hyfxzks1", "hyfxzks2"],
                    "版本": "1"
                },
                "做备忘录": {
                    "exec": [{
                        "fun": "几率_调用次数",
                        "dat": {
                            "1": 80,
                            "10": 40
                        }
                    }],
                    "URLs": ["zbwl"],
                    "版本": "1"
                },
                "吃饭开始": {
                    "exec": [{
                        "fun": "几率_一定播放"
                    }],
                    "URLs": ["cfks1", "cfks3"],
                    "版本": "1"
                },
                "饭前定量": {
                    "exec": [{
                        "fun": "几率_调用次数",
                        "dat": {
                            "1": 100,
                            "10": 60
                        }
                    }],
                    "URLs": ["fqdl3", "fqdl1", "fqdl2"],
                    "顺序": "循环"
                },
                "其他吃饭建议": {
                    "exec": [{
                        "fun": "几率_调用次数",
                        "dat": {
                            "1": 70,
                            "10": 40
                        }
                    }],
                    "URLs": ["cfjy1"],
                    "顺序": "循环"
                },
                "饭间闲聊": {
                    "exec": [{
                        "fun": "几率_一定播放"
                    }],
                    "URLs": ["cfxl1", "cfxl2", "cfxl1", "cfxl2", "cfxl1", "cfxl2", "cfxl3", "cfxl4"]
                },
                "刷牙准备": {
                    "exec": [{
                        "fun": "几率_一定播放"
                    }],
                    "URLs": ["syzb1", "syzb2", "syzb3"],
                    "版本": "1"
                },
                "存款的规则1": {
                    "exec": [{
                        "fun": "几率_一定播放"
                    }],
                    "URLs": ["gz1", "gz2", "gz4"],
                    "顺序": "循环"
                },
                "洗澡准备": {
                    "exec": [{
                        "fun": "几率_一定播放"
                    }],
                    "URLs": ["zbxz1", "zbxz2"],
                    "版本": "1"
                },
                "不要带手机去洗澡": {
                    "exec": [{
                        "fun": "几率_一定播放"
                    }],
                    "URLs": ["bydsjqxz1"]
                },
                "洗澡开始": {
                    "exec": [{
                        "fun": "几率_一定播放"
                    }],
                    "URLs": ["xzks1"]
                },
                "延迟": {
                    "exec": [{
                        "fun": "几率_一定播放"
                    }],
                    "URLs": ["abc1", "abc2", "abc3", "abc4"],
                    "版本": "1"
                },
                "为什么要预留存款": {
                    "exec": [{
                        "fun": "几率_调用次数",
                        "dat": {
                            "1": 100,
                            "2": 50
                        }
                    }, {
                        "fun": "几率_播放次数控制",
                        "dat": {
                            "每": 15,
                            "播": 3
                        }
                    }],
                    "URLs": ["abc1", "abc2", "abc3", "abc4"],
                    "版本": "1"
                }
            }
        }
    }
}