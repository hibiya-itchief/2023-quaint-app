import Vue from 'vue'

// quaint-apiで定義されているUserRoleとの連携
// https://github.com/hibiya-itchief/quaint-api/issues/118

// Vueインスタンスに型を追加する
declare module 'vue/types/vue' {
  interface Vue {
    $quaintUserRole(
      target: string,
      user: Record<string, unknown> | null
    ): boolean
  }
}

// Vueインスタンスにメソッドを追加する
Vue.prototype.$quaintUserRole = (
  target: string,
  user: Record<string, unknown> | null
): boolean => {
  if (user === undefined || user === null) {
    return false
  }

  const B2C_ISSUER =
    'https://seiryofesb2c.b2clogin.com/450b2222-dcb5-471d-9657-bb4ee50acd97/v2.0' // trailing slashなしで統一してstring.includes()で判定する
  const AD_ISSUER =
    'https://login.microsoftonline.com/158e6d17-f3d5-4365-8428-26dfc74a9d27/v2.0' // trailing slashなしで統一してstring.includes()で判定する
  const ADMIN = '5c091517-25de-44bc-9e42-ffcb8539435c'
  const ENTRY = '63a40184-8dab-43b4-8367-54e84ace6e2a'
  const OWNER = 'a577d858-64bf-4815-aaf6-d893c654e92e'
  const PARENTS = 'ecd46dae-d84b-42d8-9357-ac24d480a168'
  const STUDENTS = '865bb05d-cb7d-4919-b18d-8b977ec0499b'
  const TEACHERS = '0a8ee476-cd37-4c31-bd6e-c34e750574f4'
  const CHIEF = '67e48f08-22e0-4ec4-9674-1428aaa5c055'

  if (!(user.iss !== undefined && typeof user.iss === 'string')) {
    return false
  }
  switch (target) {
    case 'admin':
      return (
        user.iss.includes(AD_ISSUER) &&
        user.groups !== undefined &&
        Array.isArray(user.groups) &&
        user.groups.includes(ADMIN)
      )
    case 'owner':
      return (
        user.iss.includes(AD_ISSUER) &&
        user.groups !== undefined &&
        Array.isArray(user.groups) &&
        user.groups.includes(OWNER)
      )
    case 'chief':
      return (
        user.iss.includes(AD_ISSUER) &&
        user.groups !== undefined &&
        Array.isArray(user.groups) &&
        user.groups.includes(CHIEF)
      )
    case 'entry':
      return (
        user.iss.includes(AD_ISSUER) &&
        user.groups !== undefined &&
        Array.isArray(user.groups) &&
        user.groups.includes(ENTRY)
      )
    case 'everyone':
      return true
    case 'paper':
      return false
    case 'b2c':
      return user.iss.includes(B2C_ISSUER)
    case 'b2c_visited':
      return (
        user.iss.includes(B2C_ISSUER) &&
        user.jobTitle !== undefined &&
        typeof user.jobTitle === 'string' &&
        (user.jobTitle.includes('Visited') || user.jobTitle.includes('visited'))
      )
    case 'ad':
      return user.iss.includes(AD_ISSUER)
    case 'parents':
      return (
        user.iss.includes(AD_ISSUER) &&
        user.groups !== undefined &&
        Array.isArray(user.groups) &&
        user.groups.includes(PARENTS)
      )
    case 'student':
      return (
        user.iss.includes(AD_ISSUER) &&
        user.groups !== undefined &&
        Array.isArray(user.groups) &&
        user.groups.includes(STUDENTS)
      )
    case 'school':
      return (
        user.iss.includes(AD_ISSUER) &&
        user.groups !== undefined &&
        Array.isArray(user.groups) &&
        (user.groups.includes(STUDENTS) || user.groups.includes(TEACHERS))
      )
    case 'visited':
      return (
        (user.iss.includes(B2C_ISSUER) &&
          user.jobTitle !== undefined &&
          typeof user.jobTitle === 'string' &&
          (user.jobTitle.includes('Visited') ||
            user.jobTitle.includes('visited'))) ||
        user.iss.includes(AD_ISSUER)
      )
    case 'visited_parents':
      return (
        (user.iss.includes(B2C_ISSUER) &&
          user.jobTitle !== undefined &&
          typeof user.jobTitle === 'string' &&
          (user.jobTitle.includes('Visited') ||
            user.jobTitle.includes('visited'))) ||
        (user.iss.includes(AD_ISSUER) &&
          user.groups !== undefined &&
          Array.isArray(user.groups) &&
          user.groups.includes(PARENTS))
      )
    case 'visited_school':
      return (
        (user.iss.includes(B2C_ISSUER) &&
          user.jobTitle !== undefined &&
          typeof user.jobTitle === 'string' &&
          (user.jobTitle.includes('Visited') ||
            user.jobTitle.includes('visited'))) ||
        (user.iss.includes(AD_ISSUER) &&
          user.groups !== undefined &&
          Array.isArray(user.groups) &&
          (user.groups.includes(STUDENTS) || user.groups.includes(TEACHERS)))
      )
    case 'school_parents':
      return (
        user.iss.includes(AD_ISSUER) &&
        user.groups !== undefined &&
        Array.isArray(user.groups) &&
        (user.groups.includes(STUDENTS) ||
          user.groups.includes(TEACHERS) ||
          user.groups.includes(PARENTS))
      )

    default:
      return false
  }
}
