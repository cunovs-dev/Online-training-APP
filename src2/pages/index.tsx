import {useModel} from 'umi';
import RadioBox from '@/components/RadioBox'
import styles from './index.less';

const data = {
  title: '网格长能力自评',
  description: '请根据自身情况评价，打分要求：每题虽有四项，但总分只有10分。请在四项中选出一个能力强项，打分要超过5分（即在5-10分中选一个），然后再打其它三项，注意控制四项之和为10分，不得空选。比如：第一题的第一项打6分、第二项打3分、第三项打1分、第四项打0分，这样就是10分（6+3+1+0=10分）。',
  content: [
    {
      key:'self',
      question: '1.个体层面运营管理能力自评。',
      item: [
        {
          name: 'ag1',
          text: '明确职责目标：职责界定清晰，绩效管理到位，培训指导到位，提升工作积极性，保持良好工作状态。'
        },
        {
          name: 'ag2',
          text: '外部协调沟通：对外交流顺畅，各方协调有力，取得认同和支持。'
        },
        {
          name: 'ag3',
          text: '树立专业权威：增加客户触点，提升服务体验，赢得客户信赖。'
        },
        {
          name: 'ag4',
          text: ' 建设执行到位：计划详细周密，业务指导到位，及时跟进帮扶，完成渠道销售、服务和规范管理目标。'
        }
      ]
    },
    {
      key:'team',
      question: '2. 团队层面运营管理能力自评。',
      item: [
        {
          name: 'bg1',
          text: '高效协同补位：明确团队成员的职责分工，彼此协同配合，建设高效团队，形成团队合力。'
        },
        {
          name: 'bg2',
          text: ' 深化客情关系：维系良好客情关系，开展多层次对接，体现优良团队作风，解决客户痛点。'
        },
        {
          name: 'bg3',
          text: '赢得良好口碑：组织公关活动，提高服务效率，赢得社会美誉。'
        },
        {
          name: 'bg4',
          text: '科学高效运营：数据监控驱动，科学管理运营，业务全面提升。'
        }
      ]
    },
    {
      key:'organization',
      question: '3. 组织层面运营管理能力自评。',
      item: [
        {
          name: 'cg1',
          text: '激发热情活力：落实党业融合，做好选育用留，关爱员工提升凝聚力，运用激励手段鼓舞士气，激发组织活力。'
        },
        {
          name: 'cg2',
          text: '实现合作共赢：把握动态信息，进行深度交流，提供系统方案，协同多方力量，实现全赢。'
        },
        {
          name: 'cg3',
          text: '保持引领地位：发现商业契机，固巩市场地位，引领行业发展。'
        },
        {
          name: 'cg4',
          text: '创新跨越发展：线上线下融合，成功转型升级，创新发展思路，达成战略目标。'
        }
      ]
    }
  ]
}

export default function IndexPage() {

  const {title = '', description = '', content = []} = data
  return (
    <div>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.description}>{description}</div>
      <RadioBox data={content} />
    </div>
  );
}
