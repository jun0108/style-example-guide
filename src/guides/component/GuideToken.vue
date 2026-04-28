<template>
  <main class="guide-page">
    <h1>토큰</h1>

    <section class="guide-section">
      <h2>Props</h2>
      <table class="guide-table">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>kind</code></td>
            <td><code>'chip' | 'tag' | 'badge' | 'badge-dot' | 'badge-count' | 'badge-state'</code></td>
            <td><code>'chip'</code></td>
            <td>표시 유형</td>
          </tr>
          <tr>
            <td><code>color</code></td>
            <td><code>string</code></td>
            <td><code>'primary'</code></td>
            <td>유형별 컬러 계열</td>
          </tr>
          <tr>
            <td><code>size</code></td>
            <td><code>'md' | 'sm'</code></td>
            <td><code>'md'</code></td>
            <td>크기</td>
          </tr>
          <tr>
            <td><code>type</code></td>
            <td><code>'fill' | 'line'</code></td>
            <td><code>'fill'</code></td>
            <td>Badge 시각 스타일</td>
          </tr>
          <tr>
            <td><code>state</code></td>
            <td><code>'good' | 'bad'</code></td>
            <td><code>'good'</code></td>
            <td>상태형 Badge 아이콘</td>
          </tr>
          <tr>
            <td><code>selected</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>선택된 상태 표시</td>
          </tr>
          <tr>
            <td><code>removable</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Tag 삭제 버튼 표시</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="guide-section">
      <h2>Chip</h2>
      <blockquote>
        <code>color</code>는 <code>primary</code>/<code>secondary</code>, <code>size</code>는 <code>md</code>/<code
          >sm</code
        >
        조합으로 제공합니다.
      </blockquote>

      <ul class="guide-list-stack">
        <li class="guide-section guide-section--sm guide-surface">
          <span class="guide-text-subtle"><code>medium</code> · md</span>
          <table class="guide-table">
            <thead>
              <tr>
                <th>Color</th>
                <th>default</th>
                <th>selected</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>primary</code></td>
                <td><cm-token color="primary" size="md">Chip</cm-token></td>
                <td><cm-token color="primary" size="md" selected>Chip</cm-token></td>
              </tr>
              <tr>
                <td><code>secondary</code></td>
                <td><cm-token color="secondary" size="md">Chip</cm-token></td>
                <td><cm-token color="secondary" size="md" selected>Chip</cm-token></td>
              </tr>
            </tbody>
          </table>
        </li>

        <li class="guide-section guide-section--sm guide-surface">
          <span class="guide-text-subtle"><code>small</code> · sm</span>
          <table class="guide-table">
            <thead>
              <tr>
                <th>Color</th>
                <th>default</th>
                <th>selected</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>primary</code></td>
                <td><cm-token color="primary" size="sm">Chip</cm-token></td>
                <td><cm-token color="primary" size="sm" selected>Chip</cm-token></td>
              </tr>
              <tr>
                <td><code>secondary</code></td>
                <td><cm-token color="secondary" size="sm">Chip</cm-token></td>
                <td><cm-token color="secondary" size="sm" selected>Chip</cm-token></td>
              </tr>
            </tbody>
          </table>
        </li>
      </ul>
    </section>

    <section class="guide-section">
      <h2>Tag Remove</h2>
      <blockquote>삭제 가능한 태그는 <code>kind="tag"</code>와 <code>removable</code>을 함께 사용합니다.</blockquote>

      <table class="guide-table">
        <thead>
          <tr>
            <th>Size</th>
            <th>primary</th>
            <th>secondary</th>
            <th>neutral</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>medium</code></td>
            <td><cm-token kind="tag" color="primary" size="md" removable>#Tag</cm-token></td>
            <td><cm-token kind="tag" color="secondary" size="md" removable>#Tag</cm-token></td>
            <td><cm-token kind="tag" color="neutral" size="md" removable>#Tag</cm-token></td>
          </tr>
          <tr>
            <td><code>small</code></td>
            <td><cm-token kind="tag" color="primary" size="sm" removable>#Tag</cm-token></td>
            <td><cm-token kind="tag" color="secondary" size="sm" removable>#Tag</cm-token></td>
            <td><cm-token kind="tag" color="neutral" size="sm" removable>#Tag</cm-token></td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="guide-section">
      <h2>Tag Readonly</h2>
      <blockquote>읽기 전용 태그는 삭제 버튼 없이 텍스트만 표시합니다.</blockquote>

      <table class="guide-table">
        <thead>
          <tr>
            <th>Size</th>
            <th>primary</th>
            <th>secondary</th>
            <th>neutral</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>medium</code></td>
            <td><cm-token kind="tag" color="primary" size="md">#Tag</cm-token></td>
            <td><cm-token kind="tag" color="secondary" size="md">#Tag</cm-token></td>
            <td><cm-token kind="tag" color="neutral" size="md">#Tag</cm-token></td>
          </tr>
          <tr>
            <td><code>small</code></td>
            <td><cm-token kind="tag" color="primary" size="sm">#Tag</cm-token></td>
            <td><cm-token kind="tag" color="secondary" size="sm">#Tag</cm-token></td>
            <td><cm-token kind="tag" color="neutral" size="sm">#Tag</cm-token></td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="guide-section">
      <h2>Badge</h2>
      <blockquote>
        일반 Badge는 <code>type="fill"</code>과 <code>type="line"</code>으로 버튼 명명 방식과 맞춥니다.
      </blockquote>

      <table class="guide-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>purple</th>
            <th>pink</th>
            <th>neutral</th>
            <th>blue</th>
            <th>red</th>
            <th>green</th>
            <th>yellow</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>fill</code></td>
            <td><cm-token kind="badge" color="purple" type="fill">Badge</cm-token></td>
            <td><cm-token kind="badge" color="pink" type="fill">Badge</cm-token></td>
            <td><cm-token kind="badge" color="neutral" type="fill">Badge</cm-token></td>
            <td><cm-token kind="badge" color="blue" type="fill">Badge</cm-token></td>
            <td><cm-token kind="badge" color="red" type="fill">Badge</cm-token></td>
            <td><cm-token kind="badge" color="green" type="fill">Badge</cm-token></td>
            <td><cm-token kind="badge" color="yellow" type="fill">Badge</cm-token></td>
          </tr>
          <tr>
            <td><code>line</code></td>
            <td><cm-token kind="badge" color="purple" type="line">Badge</cm-token></td>
            <td><cm-token kind="badge" color="pink" type="line">Badge</cm-token></td>
            <td><cm-token kind="badge" color="neutral" type="line">Badge</cm-token></td>
            <td><cm-token kind="badge" color="blue" type="line">Badge</cm-token></td>
            <td><cm-token kind="badge" color="red" type="line">Badge</cm-token></td>
            <td><cm-token kind="badge" color="green" type="line">Badge</cm-token></td>
            <td><cm-token kind="badge" color="yellow" type="line">Badge</cm-token></td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="guide-section">
      <h2>Badge Dot</h2>

      <table class="guide-table">
        <thead>
          <tr>
            <th>primary</th>
            <th>secondary</th>
            <th>red</th>
            <th>neutral</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><cm-token kind="badge-dot" color="primary" /></td>
            <td><cm-token kind="badge-dot" color="secondary" /></td>
            <td><cm-token kind="badge-dot" color="red" /></td>
            <td><cm-token kind="badge-dot" color="neutral" /></td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="guide-section">
      <h2>Badge Count</h2>

      <table class="guide-table">
        <thead>
          <tr>
            <th>primary</th>
            <th>primary-light</th>
            <th>neutral</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><cm-token kind="badge-count" color="primary">1</cm-token></td>
            <td><cm-token kind="badge-count" color="primary-light">1</cm-token></td>
            <td><cm-token kind="badge-count" color="neutral">1</cm-token></td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="guide-section">
      <h2>Badge State</h2>

      <table class="guide-table">
        <thead>
          <tr>
            <th>good</th>
            <th>bad</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><cm-token kind="badge-state" state="good" /></td>
            <td><cm-token kind="badge-state" state="bad" /></td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>
</template>
