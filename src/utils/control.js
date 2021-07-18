function LefaminSetTextareaAutoHeight($t)
{
  let h = $t.height(); $t.on('input', () =>
  {
    $t.height(0); let h2 = $t.get(0).scrollHeight; if (h2 < h) h2 = h; $t.height(h2);
  })
}

function LefaminSetTextareaAutoHeightAll()
{
  $("textarea").each((index, ta) => { LefaminSetTextareaAutoHeight($(ta)) })
}