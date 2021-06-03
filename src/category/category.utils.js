export const processCategory = (name) => {
  //중괄호의 시작이 캐럿(^)일 때에는 중괄호에 해당하지 않는 문자열만 매칭
  const names = name.match(/[^,]+/g) || [];
  return names.map((name) => {
    let slug = name.trim().replace(/\s+/g, "-").toLowerCase();
    return {
      // category 에서 name이 존재 하면 connect(=where 사용),  존재 하지 않으면 create.
      where: { name },
      create: { name, slug },
    };
  });
};
