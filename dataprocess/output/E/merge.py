# 需要首先运行dataprocess中的main2024得到 us_2024.json 和 cn_2024.json

import geopandas as gpd
import os

DIR = os.path.dirname(__file__)
PATH1 = os.path.join(DIR, 'cn.json')
PATH2 = os.path.join(DIR, 'cn_2024.json')

PATH3 = os.path.join(DIR, 'us.json')
PATH4 = os.path.join(DIR, 'usa_2024.json')

PATH5 = os.path.join(DIR, 'eu.json')
PATH6 = os.path.join(DIR, 'eu_2024.json')

def cn_merge():
    gdf = gpd.read_file(PATH1, driver='GeoJSON')
    # gdf 仅仅保留 cityname, pname, geometry
    gdf = gdf[['cityname', 'pname', 'geometry']]
    gdf2 = gpd.read_file(PATH2, driver='GeoJSON')
    # gdf2 仅仅保留 1000buffer-city 300buffer-city 800buffer-city
    gdf2 = gdf2[['1000buffer-city', '300buffer-city', '800buffer-city']]
    # 重命名 '1000buffer-city', '300buffer-city', '800buffer-city' 列名 为 1000m buffer, 300m buffer, 800m buffer

    gdf2.rename(columns={'1000buffer-city': '1000m buffer', '300buffer-city': '300m buffer', '800buffer-city': '800m buffer'}, inplace=True)
    # 同时将 '1000m buffer', '300m buffer', '800m buffer' 列的值转换为浮点数
    gdf2['1000m buffer'] = gdf2['1000m buffer'].fillna(0).astype(float)
    gdf2['300m buffer'] = gdf2['300m buffer'].fillna(0).astype(float)
    gdf2['800m buffer'] = gdf2['800m buffer'].fillna(0).astype(float)
    # 合并两个 gdf
    gdf = gdf.join(gdf2)
    # 保存为 cn_merge.json
    gdf.to_file(os.path.join(DIR, 'cn_merge.json'), driver='GeoJSON')

def eu_merge():

    gdf2 = gpd.read_file(PATH6, driver='GeoJSON')

    # gdf2.rename(columns={'1000buffer-city': '1000m buffer', '300buffer-city': '300m buffer', '800buffer-city': '800m buffer'}, inplace=True)
    # 同时将 '1000m buffer', '300m buffer', '800m buffer' 列的值转换为浮点数
    gdf2['1000m buffer'] = gdf2['1000m buffer'].fillna(0).astype(float)
    gdf2['300m buffer'] = gdf2['300m buffer'].fillna(0).astype(float)
    gdf2['800m buffer'] = gdf2['800m buffer'].fillna(0).astype(float)

    # 去除名为 CC_2 的列
    gdf2 = gdf2.drop(columns=['CC_2'])

    # 保存为 cn_merge.json
    gdf2.to_file(os.path.join(DIR, 'eu_merge.json'), driver='GeoJSON')

def us_merge():
    gdf = gpd.read_file(PATH3, driver='GeoJSON')
    # gdf 去除 所有含有 buffer 的列
    gdf = gdf.drop(columns=[col for col in gdf.columns if 'buffer' in col])

    gdf2 = gpd.read_file(PATH4, driver='GeoJSON')
    # gdf2 仅仅保留 所有含有 buffer 的列
    gdf2 = gdf2[[col for col in gdf2.columns if 'buffer' in col]]
    # 重命名 '1000buffer-city', '300buffer-city', '800buffer-city' 列名 为 1000m buffer, 300m buffer, 800m buffer

    gdf2.rename(columns={'1000buffer-city': '1000m buffer', '300buffer-city': '300m buffer', '800buffer-city': '800m buffer'}, inplace=True)
    # 同时将 '1000m buffer', '300m buffer', '800m buffer' 列的值转换为浮点数
    gdf2['1000m buffer'] = gdf2['1000m buffer'].fillna(0).astype(float)
    gdf2['300m buffer'] = gdf2['300m buffer'].fillna(0).astype(float)
    gdf2['800m buffer'] = gdf2['800m buffer'].fillna(0).astype(float)
    # 合并两个 gdf
    gdf = gdf.join(gdf2)
    # 保存为 cn_merge.json
    gdf.to_file(os.path.join(DIR, 'us_merge.json'), driver='GeoJSON')

if __name__ == '__main__':
    # cn_merge()
    # us_merge()
    eu_merge()