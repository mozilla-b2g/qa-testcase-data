rm -r multiple-addon-example
mkdir multiple-addon-example
for i in $(seq 1 10)
do
  cp -r certified-app-example multiple-addon-example/addon-$i
  sed -i -e "s/Certified App/Test Addon $i/g" multiple-addon-example/addon-$i/*.json
  sed -i -e "s/Certified App/Test Addon $i/g" multiple-addon-example/addon-$i/*.webapp
  sed -i -e "s/ADDON_ID/$i/g" multiple-addon-example/addon-$i/*.js
done
