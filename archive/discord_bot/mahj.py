
from mahjong.hand_calculating.hand import HandCalculator
from mahjong.meld import Meld
from mahjong.hand_calculating.hand_config import HandConfig, OptionalRules
from mahjong.shanten import Shanten
from mahjong.tile import TilesConverter
from mahjong.hand_calculating.divider import HandDivider
from mahjong.constants  import WINDS
import discord
import asyncio
import configparser

config = configparser.SafeConfigParser()
config.read('config.ini')
token = config.get('discord', 'token')

client = discord.Client()

calculator = HandCalculator()


# useful helper
def print_hand_result(hand_result):
    print(hand_result.han, hand_result.fu)
    print(hand_result.cost['main'])
    print(hand_result.yaku)
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
    return m

def to_honors(txt):
    return txt.replace('東', '1').replace('南', '2').replace('西', '3').replace('北', '4').replace('白', '5').replace('撥', '6').replace('中', '7')

def to_136_array(obj=None, man=None, pin=None, sou=None, honors=None, has_aka_dora=True):
    if obj == None:
        return TilesConverter.string_to_136_array(man=man, pin=pin, sou=sou, honors=honors, has_aka_dora=has_aka_dora)
    else:
        return TilesConverter.string_to_136_array(man=obj["man"], pin=obj["pin"], sou=obj["sou"], honors=obj["honors"], has_aka_dora=has_aka_dora)

def maj_cal(te_hai):
    #te_hai = input("てはい＞＞") #p:1 s:1 m:1 j:東南西北撥白中 a:p1 b:東 k:東 tumo ron kan:1111
    tehai_list = {"man":None,"pin":None,"sou":None,"honors":None}
    agarihai_list = {"man":None,"pin":None,"sou":None,"honors":None}
    handconfig = HandConfig(options=OptionalRules(has_open_tanyao=True,has_aka_dora=True))
    melds = []
    dora_indicators = []
    for i in te_hai.split():
        if ":" in i:
            tmp = i.split(":")

            if tmp[0] == "p": #ピンズの手牌設定 p:123456789r
                tehai_list["pin"] = tmp[1]
            elif tmp[0] == "s": #ソウズの手牌設定 s:123456789r
                tehai_list["sou"] = tmp[1]
            elif tmp[0] == "m": #マンズの手牌設定 m:123456789r
                tehai_list["man"] = tmp[1]
            elif tmp[0] == "j": #字牌の手牌設定 j:123456789r
                tehai_list["honors"] = to_honors(tmp[1])

            elif tmp[0] == "a": #上がり牌 a:p1
                if tmp[1][0] == "p":
                    agarihai_list["pin"] = tmp[1][1]
                elif tmp[1][0] == "s":
                    agarihai_list["sou"] = tmp[1][1]
                elif tmp[1][0] == "m":
                    agarihai_list["man"] = tmp[1][1]
                elif tmp[1][0] == "j":
                    agarihai_list["honors"] = to_honors(tmp[1][1])
            
            elif tmp[0] == "b": #場風　j:東
                handconfig.round_wind=WINDS[int(to_honors(tmp[1]))-1]

            elif tmp[0] == "k": #自風　k:東
                handconfig.player_wind=WINDS[int(to_honors(tmp[1]))-1]

            elif tmp[0] == "kan": #カン　kan:s1111n nのありなしで鳴きを判断
                if tmp[1][0] == "p": kan_tiles = to_136_array(pin=tmp[1][1:5])
                elif tmp[1][0] == "s": kan_tiles = to_136_array(sou=tmp[1][1:5])
                elif tmp[1][0] == "m": kan_tiles = to_136_array(man=tmp[1][1:5])
                elif tmp[1][0] == "j": kan_tiles = to_136_array(honors=to_honors(tmp[1][1:5]))
                if tmp[1][-1] == "n":
                    melds.append(Meld(meld_type=Meld.KAN, tiles=kan_tiles, opened=True))
                else:
                    melds.append(Meld(meld_type=Meld.KAN, tiles=kan_tiles, opened=False))

            # elif tmp[0] == "chankan": #チャンカン
            #     if tmp[1][0] == "p": chankan_tiles = to_136_array(pin=tmp[1][1:5])
            #     elif tmp[1][0] == "s": chankan_tiles = to_136_array(sou=tmp[1][1:5])
            #     elif tmp[1][0] == "m": chankan_tiles = to_136_array(man=tmp[1][1:5])
            #     elif tmp[1][0] == "j": chankan_tiles = to_136_array(honors=to_honors(tmp[1][1:5]))
            #     melds.append(Meld(meld_type=Meld.CHANKAN, tiles=chankan_tiles))

            elif tmp[0] == "pon": #ポン　pon:s111
                if tmp[1][0] == "p": pon_tiles = to_136_array(pin=tmp[1][1:4])
                elif tmp[1][0] == "s": pon_tiles = to_136_array(sou=tmp[1][1:4])
                elif tmp[1][0] == "m": pon_tiles = to_136_array(man=tmp[1][1:4])
                elif tmp[1][0] == "j": pon_tiles = to_136_array(honors=to_honors(tmp[1][1:4]))
                melds.append(Meld(meld_type=Meld.PON, tiles=pon_tiles))

            elif tmp[0] == "chi": #チー　chi:s111
                if tmp[1][0] == "p": chi_tiles = to_136_array(pin=tmp[1][1:4])
                elif tmp[1][0] == "s": chi_tiles = to_136_array(sou=tmp[1][1:4])
                elif tmp[1][0] == "m": chi_tiles = to_136_array(man=tmp[1][1:4])
                elif tmp[1][0] == "j": chi_tiles = to_136_array(honors=to_honors(tmp[1][1:4]))
                melds.append(Meld(meld_type=Meld.CHI, tiles=chi_tiles))

            elif tmp[0] == "dora": #ドラ　dora:s1s1s1
                for dora_i in range(0,len(tmp[1]),2):
                    if tmp[1][dora_i] == "p": dora_tiles = to_136_array(pin=tmp[1][dora_i+1])
                    elif tmp[1][dora_i] == "s": dora_tiles = to_136_array(sou=tmp[1][dora_i+1])
                    elif tmp[1][dora_i] == "m": dora_tiles = to_136_array(man=tmp[1][dora_i+1])
                    elif tmp[1][dora_i] == "j": dora_tiles = to_136_array(honors=to_honors(tmp[1][dora_i+1]))
                    dora_indicators.append(dora_tiles[0])

                
        else:
            if i in ["tumo", "ツモ", "つも"]:
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
            elif i in ["だぶりー", "ダブリー", "だぶるりーち", "ダブルリーチ"]:
                handconfig.is_daburu_riichi=True
            elif i in ["流しマンガン", "ナガシマンガン", "ながしまんがん"]:
                handconfig.is_nagashi_mangan=True
            elif i in ["テンホウ", "てんほう"]:
                handconfig.is_tenhou=True
            elif i in ["レンホウ", "れんほう"]:
                handconfig.is_renhou=True
            elif i in ["ちいほう", "チイホウ"]:
                handconfig.is_chiihou=True

    import json
    print(json.dumps(tehai_list, indent=4))
    print(json.dumps(agarihai_list, indent=4))

    tiles = to_136_array(tehai_list, has_aka_dora=True)
    win_tile = to_136_array(agarihai_list, has_aka_dora=True)[0]

    if len(dora_indicators) == []: dora_indicators = None
    if len(melds) == 0: melds = None
    result = calculator.estimate_hand_value(tiles, win_tile, melds=melds, dora_indicators=dora_indicators, config=handconfig)
    return print_hand_result(result)

@client.event
async def on_ready():
    print('Logged in as')
    print(client.user.name)
    print(client.user.id)
    print('------')


@client.event
async def on_message(message):
    if message.content[:2] == "mj":
        m = maj_cal(message.content[2:])
        return await client.send_message(message.channel, m)
    
    

if __name__ == "__main__":
    client.run(token)