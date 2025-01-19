import geopandas as gpd

shapefile0 = "gadm41_CMR_0.shp"  
output_geojson = "gadm41_CMR_0.geojson"

gdf0 = gpd.read_file(shapefile0)
gdf0.to_file(output_geojson, driver="GeoJSON")
print("Conversion 0 terminée")

shapefile1 = "gadm41_CMR_1.shp"  
output_geojson = "gadm41_CMR_1.geojson"

gdf1 = gpd.read_file(shapefile1)
gdf1.to_file(output_geojson, driver="GeoJSON")
print("Conversion 1 terminée")

shapefile2 = "gadm41_CMR_2.shp"  
output_geojson = "gadm41_CMR_2.geojson"

gdf2 = gpd.read_file(shapefile2)
gdf2.to_file(output_geojson, driver="GeoJSON")
print("Conversion 2 terminée")

shapefile3 = "gadm41_CMR_3.shp"  
output_geojson = "gadm41_CMR_3.geojson"

gdf3 = gpd.read_file(shapefile3)
gdf3.to_file(output_geojson, driver="GeoJSON")
print("Conversion 3 terminée")
