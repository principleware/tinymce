include Makefile.inc

DST_DIR_BASE := principleware-tinymce-tailor

#tinymce
include TINYMCE.mk

test:
	echo $(TINYMCE_TARGET_CLASSES)

