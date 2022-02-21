import { join, format } from "./join";

test("join path strings.", () => {
  expect(join(`dd\\`, "/ff")).toBe("/dd/ff");
  expect(
    join(`./foo/ziggy`, ".\\ff/this is it", "../../some text with spaces")
  ).toBe("/foo/ziggy/ff/this is it/some text with spaces");
});

test("join with file extension", () => {
  expect(join(`../../foo/cat///dog//is ok.ext`)).toBe(`/foo/cat/dog/is ok.ext`);
});
test("join string when cd format.", () => {
  expect(join(`../foo`, "../foo", "..\\foo", "bar.txt")).toBe(
    "/foo/foo/foo/bar.txt"
  );
});

test('lots of random strings',()=>{
    expect(join('../../cat../','dog','cow/','../moo#','../../..///fileWith.extension' ))
    .toBe('/cat/dog/cow/moo#/fileWith.extension')
})

test("format path", () => {
  expect(format("../foo/foo/bar/")).toBe("/foo/foo/bar");
  expect(format("..//foo/foo//bar//")).toBe("/foo/foo/bar");
  expect(format("/foo/foo/bar")).toBe("/foo/foo/bar");
});

test("format path with trailing slash", () => {
  expect(format("../foo/foo/bar/", true)).toBe("/foo/foo/bar/");
});
