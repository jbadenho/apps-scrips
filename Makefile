# help: @ Lists available make tasks
help:
	@egrep -oh '[0-9a-zA-Z_\.\-]+:.*?@ .*' $(MAKEFILE_LIST) | \
	awk 'BEGIN {FS = ":.*?@ "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

# clean: @ Cleans
.PHONY: clean
clean:

# git: @ Performs git commands to add work from current branch to GitHub
git: COMMENT ?=
git:
	git add .
	git commit -m "$(COMMENT)"
	git push origin $(shell git branch --show-current)
	