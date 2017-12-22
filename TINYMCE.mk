#tinymce
TINYMCE_SRC_DIR := src/core/src/main/js
TINYMCE_DST_DIR := $(DST_DIR_BASE)

TINYMCE_UTIL_SOURCES = $(shell find $(TINYMCE_SRC_DIR)/util -type f -name '*.js') 
# TINYMCE_DATA_SOURCES = $(shell find $(TINYMCE_SRC_DIR)/data -type f -name '*.js') 
TINYMCE_SRC_CLASSES := $(TINYMCE_UTIL_SOURCES) $(TINYMCE_DATA_SOURCES) # $(TINYMCE_SRC_DIR)/Env.js
TINYMCE_TARGET_CLASSES := $(subst src/core/src/main/js,$(TINYMCE_DST_DIR),$(TINYMCE_SRC_CLASSES))

# $(TINYMCE_DST_DIR)/%.js: $(TINYMCE_SRC_DIR)/%.js
#	$(ECHO) Making a file $@ from $<
#	$(CP) $(CPFlALGS) $< $@

$(TINYMCE_DST_DIR)/util/%.js: $(TINYMCE_SRC_DIR)/util/%.js
	$(ECHO) Making a file $@ from $<
	$(MKDIR) -p $(dir $@)
	$(CP) $(CPFlALGS) $< $@

# $(TINYMCE_DST_DIR)/data/%.js: $(TINYMCE_SRC_DIR)/data/%.js
#	$(ECHO) Making a file $@ from $<
#	$(MKDIR) -p $(dir $@)
#	$(CP) $(CPFlALGS) $< $@

# tinymce
tinymce_dir:
	rm -rf $(TINYMCE_DST_DIR)/util
	$(MKDIR) -p $(TINYMCE_DST_DIR)

$(TINYMCE_TARGET_CLASSES): | tinymce_dir

tinymce: $(TINYMCE_TARGET_CLASSES)
	echo "tinymce updated"
	echo "replace some prefix"
	cd $(TINYMCE_DST_DIR) && find . -type f -exec sed -i 's/tinymce.core.util./principleware-tinymce-tailor\/src\/util\//g' {} \;
#	cd $(TINYMCE_DST_DIR) && find . -type f -exec sed -i 's/tinymce.core.data./principleware-tinymce-tailor\/data\//g' {} \;
#	cd $(TINYMCE_DST_DIR) && find . -type f -exec sed -i 's/tinymce.core./principleware-tinymce\//g' {} \;

clean_tinymce:
	$(RM) -rf $(TINYMCE_DST_DIR)
	echo "tinymce cleaned"

