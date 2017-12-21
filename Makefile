include Makefile.inc

DST_DIR_BASE := ../../src

#tinymce
include TINYMCE.mk

test:
	echo $(TINYMCE_TARGET_CLASSES)

