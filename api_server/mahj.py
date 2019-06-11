
from mahjong.hand_calculating.hand import HandCalculator
from mahjong.meld import Meld
from mahjong.hand_calculating.hand_config import HandConfig, OptionalRules
from mahjong.shanten import Shanten
from mahjong.tile import TilesConverter
from mahjong.hand_calculating.divider import HandDivider
from mahjong.constants  import WINDS
import json
calculator = HandCalculator()



# useful helper
def print_hand_result(hand_result):
    #print(hand_result.han, hand_result.fu)
    #print(hand_result.cost['main'])
    #print(hand_result.yaku)
    m = ""
    m += str(hand_result.han) + "翻" + str(hand_result.fu) +"符\n"
    try:
        if hand_result.cost['additional'] == 0:
            m += str(hand_result.cost['main']) + "点\n"
        else:
            m += str(hand_result.cost['main']) +"点\n"
    except:
        m += str(hand_result.cost['main']) + "点\n"
    m += str(hand_result.yaku)
    hand_json = {
        "han":hand_result.han,
        "fu":hand_result.fu,
        "cost":hand_result.cost,
        "yaku":str(hand_result.yaku)[1:-1].split(", "),
        "fu_details":hand_result.fu_details,
    }
    #print(json.dumps(hand_json,indent=4))
    return hand_json

def to_136_array(obj=None, man=None, pin=None, sou=None, honors=None, has_aka_dora=True):
    if obj == None:
        return TilesConverter.string_to_136_array(man=man, pin=pin, sou=sou, honors=honors, has_aka_dora=has_aka_dora)
    else:
        return TilesConverter.string_to_136_array(man=obj["man"], pin=obj["pin"], sou=obj["sou"], honors=obj["honors"], has_aka_dora=has_aka_dora)

def maj_cal(data):
    """{
        "tehai":{
            "man":"111",
            "pin":"222",
            "sou":"333",
            "honors":"11166"
        },
        "agari":{
            "man":"1",
            "pin":"",
            "sou":"",
            "honors":""
        },
        "wind":{
            "round":"1",
            "player":"1",
        },
        "dora":
            {"man":"",
            "pin":"1",
            "sou":"",
            "honors":""
            },
        "kan":[
            {"man":"",
            "pin":"",
            "sou":"",
            "honors":"",
            "open":""
            }
        ],
        "pon":[
            {"man":"",
            "pin":"",
            "sou":"",
            "honors":""
            }
        ],
        "chi":[
            {"man":"",
            "pin":"",
            "sou":"",
            "honors":""
            }
        ],
        "option":[]
    }"""

    handconfig = HandConfig(options=OptionalRules(has_open_tanyao=True,has_aka_dora=True))
    melds = []
    dora_indicators = []

    if "wind" in data.keys():
        handconfig.round_wind = WINDS[int(data["wind"]["round"])-1]
        handconfig.player = WINDS[int(data["wind"]["player"])-1]

    if "kan" in data.keys() and len(data["kan"]) > 0:
        for kan in data["kan"]:
            opened = (kan["open"] in {"1", 1})
            melds.append(Meld(meld_type=Meld.KAN, tiles=to_136_array(obj=kan), opened=opened))

    if "pon" in data.keys() and len(data["pon"]) > 0:
        for pon in data["pon"]:
            melds.append(Meld(meld_type=Meld.PON, tiles=to_136_array(obj=pon)))

    if "chi" in data.keys() and len(data["chi"]) > 0:
        for chi in data["chi"]:
            melds.append(Meld(meld_type=Meld.CHI, tiles=to_136_array(obj=chi)))

    if "dora" in data.keys():
        dora_indicators = to_136_array(obj=data["dora"])

    if "option" in data.keys():
        for i in data["option"]:
            if i in ["tsumo", "ツモ", "つも"]:
                handconfig.is_tsumo =True
            elif i in ["riichi", "リーチ", "りーち"]:
                handconfig.is_riichi =True
            elif i in ["rinshan", "嶺上", "りんしゃん", "リンシャン"]:
                handconfig.is_rinshan=True
            elif i in ["ippatsu", "一発", "いっぱつ", "イッパツ"]:
                handconfig.is_ippatsu=True
            elif i in ["chankan", "槍槓", "ちゃんかん", "チャンカン"]:
                handconfig.is_chankan=True
            elif i in ["haitei", "海底", "はいてい", "ハイテイ"]:
                handconfig.is_haitei=True
            elif i in ["houtei", "河底", "ほうてい", "ホウテイ"]:
                handconfig.is_houtei=True
            elif i in ["daburu_riichi", "だぶりー", "ダブリー", "だぶるりーち", "ダブルリーチ"]:
                handconfig.daburu_riichi=True
            elif i in ["nagashi_mangan", "流しマンガン", "ナガシマンガン", "ながしまんがん"]:
                handconfig.is_nagashi_mangan=True
            elif i in ["tenhou", "テンホウ", "てんほう"]:
                handconfig.is_tenhou=True
            elif i in ["renhou", "レンホウ", "れんほう"]:
                handconfig.is_renhou=True
            elif i in ["chiihou", "ちいほう", "チイホウ"]:
                handconfig.is_chiihou=True

    import json
    #print(json.dumps(data["tehai"], indent=4))
    #print(json.dumps(data["agari"], indent=4))

    tiles = to_136_array(data["tehai"], has_aka_dora=True)
    win_tile = to_136_array(data["agari"], has_aka_dora=True)[0]

    if len(dora_indicators) == []: dora_indicators = None
    if len(melds) == 0: melds = None
    result = calculator.estimate_hand_value(tiles, win_tile, melds=melds, dora_indicators=dora_indicators, config=handconfig)
    return print_hand_result(result)

if __name__ == '__main__':
    maj_cal({
            "tehai":{
                "man":"111",
                "pin":"222",
                "sou":"333",
                "honors":"11166"
            },
            "agari":{
                "man":"1",
                "pin":"",
                "sou":"",
                "honors":""
            },
            "wind":{
                "round":"1",
                "player":"1",
            },
            "dora":
                {"man":"",
                "pin":"1",
                "sou":"",
                "honors":""},
            "kan":[
                {"man":"",
                "pin":"2222",
                "sou":"",
                "honors":"",
                "open":"1"}
            ],
            "pon":[
                {"man":"",
                "pin":"",
                "sou":"333",
                "honors":""}
            ],
            "option":["tumo"]
        })