import contextlib
import pathlib
import re

pat = re.compile(r"import (\".*\"|'.*');?")

no_js = str(pathlib.Path(__file__).parent) # no one uses basicpack it's not a thing on npm

# assumes an exported polyfill thingy, i dont wanna deal with that polyfill shit eww
def bundle_files(input_file: str, deps_dir: str = no_js) -> str:
    fpath = pathlib.Path(input_file)
    fparent = fpath.parent
    deps = pathlib.Path(deps_dir)
    fd = fpath.open("r")

    line: str = True # type: ignore
    ret = ""
    while line:
        line = fd.readline()
        if "@" not in line: # //@imp marker on line for bundling fast
            ret += line
            continue

        match = pat.match(line)
        while match:
            # line = line[:match.start()] + line[match.end():]
            path = pathlib.Path(match.group(1)[1:-1]).with_suffix("")
            search_locations = [deps.joinpath(path), fparent.joinpath(path)]

            mod_file = None
            # in the file folder or deps folder
            for i in (search_locations + list(i.with_suffix(".js") for i in search_locations)):
                if i.exists():
                    mod_file = i

            ret += line[:match.start()]
            if mod_file:
                ret += f"\n// bundled {match.group(1)} from {mod_file}\n" + mod_file.read_text() + "\n"

            line = line[match.end():]
            match = pat.match(line)


    return ret

def main(argv: list[str]):
    argc = len(argv) - 1
    fn = ""
    with contextlib.suppress(IndexError):
        fn = argv[1]

    if argc not in {1, 3} or fn.lower() in {"-h", "--help"} :
        return print("basicpack <file> [-D deps_folder]")

    deps = no_js
    if argc == 3:
        deps = argv[3]

    build = pathlib.Path("./build/basicpack")
    build.mkdir(parents=True, exist_ok=True)

    (build / (pathlib.Path(fn).stem + "-basic-packed.js")).write_text(bundle_files(fn, deps))

if __name__ == "__main__": main(__import__("sys").argv)