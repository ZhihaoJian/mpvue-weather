const date = new Date();
// 湿度处理
export function humidity(h) {
  if (h) {
    return '湿度 ' + h + '%'
  }
  return h
}

// 根据风的 code 和风力输出文案
export function wind(code, level) {
  if (!code) {
    return '无风'
  }
  if (level) {
    level = level.toString().split('-')
    level = level[level.length - 1]
    return code + ' ' + level + '级'
  }

  return code
}

/**
 * 格式化日期 
 * @param {*} index 
 * @param {*} date 
 */
export function formatWeeklyDate(index, week) {
  if (!index || !date) {
    console.error('Function formatWeeklyDate should have two arguments');
    // return;
  }

  if (index === 0) {
    return '今天'
  } else if (index === 1) {
    return '明天'
  } else if (index === 2) {
    return '后天'
  } else {
    return week;
  }
}

export function formatDate(time) {
  if (!time) {
    console.warn('time is now defined');
    return ""
  }
  time = time.split('-');
  return `${time[1]}/${time[2]}`;
}

export function windLevel(wind) {
  if (wind) {
    return `${wind}级`;
  }
}
