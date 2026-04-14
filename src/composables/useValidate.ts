function validateRefs(refs: Ref[]): Ref[] {
  const invalidRefs: Ref[] = [];
  refs.forEach((_r: Ref) => {
    if (Array.isArray(_r.value)) {
      let invalidCount = 0;
      _r.value.forEach((_i: any) => {
        if (_i.validate && !_i.validate()) {
          invalidCount += 1;
        }
      });
      if (invalidCount > 0) {
        invalidRefs.push(_r);
      }
    } else {
      if (_r.value?.validate && !_r.value.validate()) {
        invalidRefs.push(_r);
      }
    }
  });
  return invalidRefs;
}

function validateData(refs: Ref[]): boolean {
  const invalidRefs = validateRefs(refs);
  return invalidRefs.length === 0;
}

export function useValidate() {
  return {
    validateRefs,
    validateData,
  };
}
