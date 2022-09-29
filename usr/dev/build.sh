#!/bin/sh

base="$1"

dst_dir="$base/dst"

mv "$dst_dir/.a-healthy-diet.html" "$dst_dir/basics.html"
mv "$dst_dir/a-healthy-diet.html" "$dst_dir/basics.html"

mv "$dst_dir/.a-nutritionally--completable-baking-flour.html" "$dst_dir/flour.html"
mv "$dst_dir/a-nutritionally--completable-baking-flour.html" "$dst_dir/flour.html"

mv "$dst_dir/flour.html" "$dst_dir/index.html"

rm -rf "$base/docs"
mv "$dst_dir" "$base/docs"



#sed -i -E 's/<li><a href="\/">flour<\/a>/<li><a href="\/" class="active">flour<\/a>/' "$dst_dir/flour.html"
#sed -i -E 's/<li><a href="\/basics">basics<\/a>/<li><a href="\/basics" class="active">basics<\/a>/' "$dst_dir/basics.html"
